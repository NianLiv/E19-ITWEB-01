import { Router } from 'express';
import UserController from './user.controller';

const routes: Router = Router();
const userController = new UserController();

routes.route('/user/sign-up').post(userController.signUp);
routes.route('/user/sign-in').post(userController.signIn);

export default routes;
