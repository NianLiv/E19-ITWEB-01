import { Router } from 'express';
import activityRoutes from './activity/activity.routes';
import userRoutes from './user/user.routes';
import workoutRoutes from './workout/workout.routes';

const routes: Router = Router();

routes.use('/', workoutRoutes);
routes.use('/', userRoutes);
routes.use('/', activityRoutes);

export default routes;
