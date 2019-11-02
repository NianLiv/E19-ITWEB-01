import { Router } from 'express';
import { auth } from '../user/auth';
import { ActivityController } from './activity.controller';

const routes: Router = Router();
const activityController = new ActivityController();

routes
  .route('/user/workout-activities')
  .get(auth, activityController.getActivities)
  .post(auth, activityController.createActivity);

routes.route('/user/workout-activities/:id').get(auth, activityController.getActivity);

export default routes;
