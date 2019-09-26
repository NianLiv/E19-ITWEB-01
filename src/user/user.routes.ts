import {Router} from "express";
import * as userController from './user.controller';
import { unauth } from '../middleware/auth';

const routes : Router = Router(); 
routes.get('/login', unauth, userController.loginView);
routes.get('/login', unauth, userController.loginView);
routes.post('/login', unauth, userController.authenticate);
routes.get('/sign-up', unauth, userController.signUpView);
routes.post('/sign-up', unauth, userController.signUp);
export default routes;