import { join } from 'path';
import User from './models';
import { NextFunction, Response, Request } from 'express';
import passport = require('passport');

export function index(req: Request, res: Response, next: NextFunction) {
    User.find().then(users => {
        res.locals.users = users;
        next();
    })
    .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
    });
}

export function indexView(req: Request, res: Response) {
    res.render(join('login'));
}

export function signUpView(req: Request, res: Response) {
    res.render("sign-up");
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

export function loginView(req: Request, res: Response) {
    res.render("login");
}

export const authenticate = passport.authenticate("local", {
    failureRedirect: '/user/login',
    failureFlash: 'Kom igen, brormand',
    successRedirect: '/',
    successFlash: 'Godt gået!'
})

const getUserParams = (body: any) => {
    return {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
    };
};