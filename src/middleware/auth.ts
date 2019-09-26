import { User } from './../user/models';
import { NextFunction, Request, Response } from 'express';
import passport = require('passport');

export function auth(req: Request, res: Response, next: NextFunction) {
    const user = req.user as User;
    if (user) {
        next();
    } else {
        res.redirect('/user/login');
    }
}   