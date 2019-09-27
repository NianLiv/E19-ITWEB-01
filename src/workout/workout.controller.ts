import { NextFunction, Response, Request } from 'express';
import workout, { Workout } from './models/workout.model';
import exercise, {Exercise} from './models/exercise.model';
import user from '../user/models';


const getWorkoutParams = (body: Workout) => {
    return {
      title : body.title,
      exercises: body.exercises
    };
};

const getExerciseParams = (body: Exercise) => {
    return {
        name : body.name,
        description : body.description,
        numberOfSets : body.numberOfSets,
        numberOfRepetitions : body.numberOfRepetitions,
        timeInMinutes : body.timeInMinutes
    }
};

export default class WorkoutController {

    static index(req: Request, res: Response, next: NextFunction): void {
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

    static indexView(req: Request, res: Response): void {
        res.render('index');
    };

    static newWorkoutView(req: Request, res: Response): void {
        res.render('new');
    };

    static addNewWorkout(req: Request, res: Response, next: NextFunction): void {
        const currentUser = res.locals.currentUser;
        const workoutParams = getWorkoutParams(req.body);
        workout.create(workoutParams)
            .then(workout => {
                user.findByIdAndUpdate(currentUser._id, {
                    $addToSet: {
                        workouts: workout
                    }
                })
                .then(() => {
                    res.redirect('/workout');
                    next();
                })
                .catch(err => {
                    console.log(`Error adding workout to user: ${err.message}`);
                    next(err);
                });
            })
            .catch(err => {
                console.log(`Error creating workout: ${err.message}`);
                next(err);
            });
    };

    static workoutView(req: Request, res: Response): void {
        res.render('singleWorkout');
    };

    static getWorkout(req: Request, res: Response, next: NextFunction): void {
        workout.findById(req.params.id).populate('exercises')
            .then(workout => {
                res.locals.workout = workout;
                next();
            })
            .catch(err => {
                console.log(`Error getting workout: ${err.message}`);
                next(err);
            });
    };

    static deleteWorkout(req: Request, res: Response, next: NextFunction): void {
        workout.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('/workout');
                next();
            })
            .catch(err => {
                console.log(`Error deleting workout: ${err.message}`);
                next(err);
            });
    };

    static newExerciseView(req: Request, res: Response): void {
        res.render('newExercise', {
            workoutID: req.params.id
        });
    };

    static addExercise(req: Request, res: Response, next: NextFunction): void {
        const workoutID = req.params.id;
        const exerciseParams = getExerciseParams(req.body);
        exercise.create(exerciseParams)
            .then(exercise => {
                workout.findByIdAndUpdate(workoutID, {
                    $addToSet: {
                        exercises: exercise
                    }
                })
                .then(() => {
                    res.redirect('/workout/' + workoutID);
                })
                .catch(err => {
                    console.log(`Error adding exercise to workout: ${err.message}`);
                    next(err);
                });
            })
            .catch(err => {
                console.log(`Error creating exercise: ${err.message}`);
                next(err);
            });
    };

    static deleteExercise(req: Request, res: Response, next: NextFunction): void {
        exercise.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('');
                next();
            })
            .catch(err => {
                console.log(`Error deleting exercise: ${err.message}`);
                next(err);
            });
    };

};