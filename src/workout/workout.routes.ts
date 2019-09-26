import {Router} from "express";
import WorkoutController from "./workout.controller";

const routes : Router = Router();
routes.get('/', WorkoutController.index, WorkoutController.indexView);
routes.get('/:id', WorkoutController.getWorkout, WorkoutController.workoutView);
routes.get('/new', WorkoutController.newWorkoutView);
routes.post('/new', WorkoutController.addNewWorkout);
routes.get('/:id/new/exercise', WorkoutController.newExerciseView);
routes.post('/:id/new/exercise', WorkoutController.addExercise);
export default routes;