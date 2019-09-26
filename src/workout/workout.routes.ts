import {Router} from "express";
import WorkoutController from "./workout.controller";

const routes : Router = Router();
routes.get('/', WorkoutController.workouts, WorkoutController.workoutView);
routes.get('/new', WorkoutController.newWorkoutView);
routes.post('/new', WorkoutController.addNewWorkout);
export default routes;