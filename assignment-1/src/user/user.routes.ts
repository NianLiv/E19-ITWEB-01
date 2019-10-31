import {Router} from "express";
import * as userController from './user.controller';
import { ensureLoggedIn, ensureLoggedOut } from "connect-ensure-login";

const routes : Router = Router(); 
routes.get('/login', ensureLoggedOut('/'), userController.loginView);
routes.get('/login', ensureLoggedOut('/'), userController.loginView);
routes.post('/login', ensureLoggedOut('/'), userController.authenticate);
routes.get('/sign-up', ensureLoggedOut('/'), userController.signUpView);
routes.post('/sign-up', ensureLoggedOut('/'), userController.signUp);
routes.get('/logout', ensureLoggedIn('/user/login'), userController.logout); 
export default routes;