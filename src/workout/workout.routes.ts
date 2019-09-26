import {Router} from "express";
import WorkoutController from "./workout.controller";
import { auth } from '../middleware/auth';

const routes : Router = Router();
routes.get('/', auth, WorkoutController.index, WorkoutController.indexView);
routes.get('/:id', auth, WorkoutController.getWorkout, WorkoutController.workoutView);
routes.get('/new', auth, WorkoutController.newWorkoutView);
routes.post('/new', auth, WorkoutController.addNewWorkout);
export default routes;