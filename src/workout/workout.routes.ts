import {Router} from "express";
import WorkoutController from "./workout.controller";
import { auth } from '../middleware/auth';

const routes : Router = Router();
routes.get('/', WorkoutController.index, WorkoutController.indexView);
routes.get('/workout/', WorkoutController.index, WorkoutController.indexView);
routes.get('/workout/new', WorkoutController.newWorkoutView);
routes.get('/workout/:id', WorkoutController.getWorkout, WorkoutController.workoutView);
routes.post('/workout/new', WorkoutController.addNewWorkout);
routes.get('/workout/:id/new/exercise', WorkoutController.newExerciseView);
routes.post('/workout/:id/new/exercise', WorkoutController.addExercise);
export default routes;