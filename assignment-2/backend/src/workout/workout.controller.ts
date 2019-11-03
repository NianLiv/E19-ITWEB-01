import { NextFunction, Request, Response } from 'express';
import { TypedRequest } from '../shared/models/custom.model';
import ExerciseModel, { CreateExerciseDTO } from './models/exercise.model';
import Workout, { CreateWorkoutDTO, IWorkout } from './models/workout.model';

export default class WorkoutController {
  public async getWorkouts(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const workouts = await Workout.find();
      if (!workouts) {
        res.status(404).send({
          success: false,
          message: 'Users not found',
          data: null,
        });
      } else {
        res.status(200).send(workouts);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async getWorkout(req: Request, res: Response, next: NextFunction) {
    const workoutId = req.params.id;
    try {
      const workout = await Workout.findById(workoutId).populate(['exercises', 'owner']);
      if (!workout) {
        res.status(404).send({
          success: false,
          message: 'Workout not found',
          data: null,
        });
      } else {
        res.status(200).send(workout);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async createWorkout(req: TypedRequest<CreateWorkoutDTO>, res: Response, next: NextFunction): Promise<any> {
    if (!req.body.title) {
      res.status(400).send({ message: 'missing title property' });
      return;
    }
    if (!req.user) {
      res.status(500).send({ message: 'No user set' });
      return;
    }
    try {
      const workout = new Workout({ title: req.body.title, owner: req.user.id } as IWorkout);
      await workout.save();
      await workout.populate('owner').execPopulate();
      res.status(200).send(workout);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async addExercise(req: TypedRequest<CreateExerciseDTO>, res: Response, next: NextFunction): Promise<any> {
    const workoutProgramId = req.params.id;
    const exercise = req.body;

    // validation
    if (!workoutProgramId) {
      res.status(400).send({ message: 'No workout program id received' });
      return;
    }
    if (
      !exercise.description ||
      !exercise.name ||
      !exercise.numberOfRepetitions ||
      !exercise.numberOfSets ||
      !exercise.timeInMinutes
    ) {
      res.status(400).send({ message: 'Parameter validation fail. Missing properties' });
      return;
    }
    if (!req.user) {
      res.status(500).send({ message: 'No user set' });
      return;
    }

    // authorization
    const workout = await Workout.findById(workoutProgramId);
    if (!workout) {
      res.status(404).send({ message: `No workout found with id: ${workoutProgramId}` });
      return;
    }
    if (workout.owner !== req.user.id) {
      res.status(403).send({ message: `No permission to add exercises to workout with id: ${workoutProgramId}` });
    }

    // add exercise
    const newExercise = new ExerciseModel(exercise);
    const createdExercise = await newExercise.save();
    if (!createdExercise) {
      res.status(500).send({ message: 'Failed to add exercise to workout' });
      return;
    }
    try {
      await Workout.findByIdAndUpdate(workoutProgramId, {
        $addToSet: { exercises: createdExercise },
      });
      res.status(200).send(createdExercise);
    } catch (error) {
      await ExerciseModel.findByIdAndDelete(createdExercise._id);
      res.status(500).send({ message: `Exercise couldn't be added to workout with id: ${workoutProgramId}` });
    }
  }
}
