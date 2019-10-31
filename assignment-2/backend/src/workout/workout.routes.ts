import {Router} from "express";
import WorkoutController from "./workout.controller";

const routes: Router = Router();
const workoutCtrl = new WorkoutController();

routes
    .route('workout-programs')
        .get(workoutCtrl.getWorkouts)
        .post(workoutCtrl.createWorkout);

routes
    .route('workout-programs/:id')
        .get(workoutCtrl.getSingleWorkout);

routes
    .route('workout-programs/{id}/exercises')
        .post();

export default routes;