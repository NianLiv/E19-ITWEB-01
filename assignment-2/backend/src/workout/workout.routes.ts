import { Router } from 'express';
import { auth } from '../user/auth';
import WorkoutController from './workout.controller';

const routes: Router = Router();
const workoutCtrl = new WorkoutController();

routes
  .route('/workout-programs')
  .get(workoutCtrl.getWorkouts)
  .post(auth, workoutCtrl.createWorkout);

routes.route('/workout-programs/:id').get(workoutCtrl.getWorkout);

routes.route('/workout-programs/:id/exercises').post(auth, workoutCtrl.addExercise);

export default routes;
