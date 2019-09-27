import {Router} from "express";
import WorkoutController from "./workout.controller";
import { ensureLoggedIn } from "connect-ensure-login";

const routes : Router = Router();
routes.get('/', ensureLoggedIn('/user/login'), WorkoutController.index, WorkoutController.indexView);
routes.get('/workout/', ensureLoggedIn('/user/login'), WorkoutController.index, WorkoutController.indexView);
routes.get('/workout/new', ensureLoggedIn('/user/login'), WorkoutController.newWorkoutView);
routes.get('/workout/:id', ensureLoggedIn('/user/login'), WorkoutController.getWorkout, WorkoutController.workoutView);
routes.post('/workout/new', ensureLoggedIn('/user/login'), WorkoutController.addNewWorkout);
routes.get('/workout/:id/new/exercise', ensureLoggedIn('/user/login'), WorkoutController.newExerciseView);
routes.post('/workout/:id/new/exercise', ensureLoggedIn('/user/login'), WorkoutController.addExercise);
routes.delete('/workout/:id/delete', ensureLoggedIn('/user/login'), WorkoutController.deleteWorkout)
export default routes;