import {Router} from "express";
import * as userController from './user.controller';

const routes : Router = Router();
routes.get('/login', userController.loginView);
routes.post('/login', userController.authenticate);
routes.get('/sign-up', userController.signUpView);
routes.post('/sign-up', userController.signUp);
export default routes;