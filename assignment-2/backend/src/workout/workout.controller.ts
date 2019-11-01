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
      const workout = await Workout.findById(workoutId).populate('exercises');
      if (!workout) {
        res.status(404).send({
          success: false,
          message: 'User not found',
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
      const workout = new Workout({ title: req.body.title, owner: req.user._id } as IWorkout);
      const result = await workout.save();
      res.send(result);
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

    // add exercise
    const newExercise = new ExerciseModel(exercise);
    newExercise
      .save()
      .then((createdExercise) => {
        Workout.findByIdAndUpdate(workoutProgramId, {
          $addToSet: {
            exercises: createdExercise,
          },
        })
          .then(() => {
            res.status(200).send(createdExercise);
          })
          .catch((err) => {
            res.status(500).send({ message: 'Failed to add exercise to workout' });
          });
      })
      .catch((err) => {
        res.status(500).send({ message: 'Failed to create exercise' });
      });
  }
}
