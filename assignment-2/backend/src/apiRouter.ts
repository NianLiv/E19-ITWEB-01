import { Router } from 'express';
import userRoutes from './user/user.routes';
import workoutRoutes from './workout/workout.routes';

const routes: Router = Router();

routes.use('/', workoutRoutes);
routes.use('/', userRoutes);

export default routes;
