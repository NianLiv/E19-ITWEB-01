import { NextFunction, Request, Response } from 'express';
import { TypedRequest } from '../shared/models/custom.model';
import ExerciseModel, { CreateExerciseDTO } from './models/exercise.model';
import Workout, { CreateWorkoutDTO, IWorkout } from './models/workout.model';

export default class WorkoutController {
  public async getWorkouts(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const workouts = await Workout.find().populate('owner');
      if (!workouts) {
        res.status(404).json({
          success: false,
          message: 'Users not found',
          data: null,
        });
      } else {
        res.status(200).json(workouts);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  public async getWorkout(req: Request, res: Response, next: NextFunction) {
    const workoutId = req.params.id;
    try {
      const workout = await Workout.findById(workoutId).populate(['exercises', 'owner']);
      if (!workout) {
        res.status(404).json({
          success: false,
          message: 'Workout not found',
          data: null,
        });
      } else {
        res.status(200).json(workout);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  public async createWorkout(req: TypedRequest<CreateWorkoutDTO>, res: Response, next: NextFunction): Promise<any> {
    if (!req.body.title) {
      res.status(400).json({ message: 'missing title property' });
      return;
    }
    if (!req.user) {
      res.status(500).json({ message: 'No user set' });
      return;
    }
    try {
      const workout = new Workout({ title: req.body.title, owner: req.user.id } as IWorkout);
      await workout.save();
      await workout.populate('owner').execPopulate();
      res.status(200).json(workout);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  public async addExercise(req: TypedRequest<CreateExerciseDTO>, res: Response, next: NextFunction): Promise<any> {
    const workoutProgramId = req.params.id;
    const exercise = req.body;

    // validation
    if (!workoutProgramId) {
      res.status(400).json({ message: 'No workout program id received' });
      return;
    }
    if (
      exercise.description === undefined ||
      exercise.name === undefined ||
      exercise.numberOfRepetitions === undefined ||
      exercise.numberOfSets === undefined ||
      exercise.timeInMinutes === undefined
    ) {
      res.status(400).json({ message: 'Parameter validation fail. Missing properties' });
      return;
    }
    if (!req.user) {
      res.status(500).json({ message: 'No user set' });
      return;
    }

    // authorization
    const workout = (await Workout.findById(workoutProgramId).populate('owner')) as IWorkout;
    if (!workout) {
      res.status(404).json({ message: `No workout found with id: ${workoutProgramId}` });
      return;
    }
    if (!workout.owner._id.equals(req.user.id)) {
      res.status(403).json({ message: `No permission to add exercises to workout with id: ${workoutProgramId}` });
      return;
    }

    // add exercise
    const newExercise = new ExerciseModel(exercise);
    const createdExercise = await newExercise.save();
    if (!createdExercise) {
      res.status(500).json({ message: 'Failed to add exercise to workout' });
      return;
    }
    try {
      await Workout.findByIdAndUpdate(workoutProgramId, {
        $addToSet: { exercises: createdExercise },
      });
      res.status(200).json(createdExercise);
    } catch (error) {
      await ExerciseModel.findByIdAndDelete(createdExercise._id);
      res.status(500).json({ message: `Exercise couldn't be added to workout with id: ${workoutProgramId}` });
    }
  }
}
