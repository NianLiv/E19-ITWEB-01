import User from './models';
import { NextFunction, Response, Request } from 'express';
import passport = require('passport');

export function loginView(req: Request, res: Response) {
  res.render('login');
}

export function signUpView(req: Request, res: Response) {
  res.render('sign-up');
}

export function signUp(req: Request, res: Response, next: NextFunction) {
  let newUser = new User(getUserParams(req.body));
  User.register(newUser, req.body.password, (e, user) => {
    if (user) {
      res.redirect('login');
      next();
    } else {
      next();
    }
  });
}

export function logout(req: Request, res: Response, next: NextFunction) {
  req.logOut();
  res.redirect('/user/login');
  next();
}

export const authenticate = passport.authenticate('local', {
  failureRedirect: '/user/login',
  failureFlash: 'Kom igen, brormand',
  successRedirect: '/',
  successFlash: 'Godt gået!'
});

const getUserParams = (body: any) => {
  return {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password
  };
};
