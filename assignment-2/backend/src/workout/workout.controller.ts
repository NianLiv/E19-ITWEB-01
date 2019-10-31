import { Request, Response, NextFunction } from "express";
import Workout from "./models/workout.model";
import Exercise from "./models/exercise.model";

export default class WorkoutController {

    public async getWorkouts(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const workouts = await Workout.find();
            if (!workouts) {
                res.status(404).send({
                    success: false,
                    message: 'Users not found',
                    data: null
                });
            } else {
                res.status(200).send(workouts);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public async getSingleWorkout(req: Request, res: Response, next: NextFunction) {
        const workoutId = req.params.id;
        try {
            const workout = await Workout.findById(workoutId).populate('exercises');
            if (!workout) {
                res.status(404).send({
                    success: false,
                    message: 'User not found',
                    data: null
                });
            } else {
                res.status(200).send(workout);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public async createWorkout(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const workout = new Workout(req.body);
            const result = await workout.save();
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public async createExercise(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {

        }
    }


}