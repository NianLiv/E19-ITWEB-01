import { NextFunction, Response, Request } from 'express';
import workout, { Workout } from './models/workout.model';

const getWorkoutParams = (body: Workout) => {
    return {
      title : body.title,
      exercises: body.exercises
    };
};

export default class WorkoutController {

    static workouts(req: Request, res: Response, next: NextFunction): void {
        workout.find()
            .then(workouts => {
                res.locals.workouts = workouts;
                next();
            })
            .catch(err => {
                console.log(`Error fetching workout: ${err.message}`);
                next(err);
            });
    };

    static workoutView(req: Request, res: Response): void {
        res.render('workout');
    };

    static newWorkoutView(req: Request, res: Response): void {
        res.render('new');
    };

    static addNewWorkout(req: Request, res: Response, next: NextFunction): void {
        const workoutParams = getWorkoutParams(req.body);
        workout.create(workoutParams)
            .then(workout => {
                console.log(workout);
                res.redirect('/workout');
                next();
            })
            .catch(err => {
                console.log(`Error saving workout: ${err.message}`);
                next(err);
            });
    };



};