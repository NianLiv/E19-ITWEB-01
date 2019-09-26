import express, { Router } from "express";
import methodOverride from 'method-override';
import layouts from 'express-ejs-layouts';
import expressSession from 'express-session';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';
import connectFlash from 'connect-flash';
import passport from 'passport';
import User from './user/models';
import bodyParser from "body-parser";

import workoutRoutes from './workout/workout.routes'
import userRoutes from './user/user.routes'

import * as userController from './user/user.controller';


export class AppRouter {
    public router : Router;

    constructor() {
        this.router = Router()
        this.setupRouter();
        this.setRoutes();
    }

    private setRoutes(): void {
        this.router.use('/workout', workoutRoutes);
        this.router.use('/user', userRoutes);
        //this.router.use('/', userController.loginView);
    }

    private setupRouter(): void {
        this.router.use(
            methodOverride("_method", {
                methods: ["POST", "GET"]
            })
        );
        
        this.router.use(layouts);
        this.router.use(express.static("public"));
        this.router.use(bodyParser.urlencoded({extended: false}));
        this.router.use(bodyParser.json());
        //this.router.use(expressValidator());
        
        this.router.use(cookieParser("secretCuisine123"));
        this.router.use(
          expressSession({
            secret: "secretCuisine123",
            cookie: {
              maxAge: 4000000
            },
            resave: false,
            saveUninitialized: false
          })
        );
        this.router.use(connectFlash());
        
        this.router.use(passport.initialize());
        this.router.use(passport.session());
        passport.use(User.createStrategy());
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
        
        this.router.use((req, res, next) => {
            res.locals.loggedIn = req.isAuthenticated();
            res.locals.currentUser = req.user;
            res.locals.flashMessages = req.flash();
            next();
        });
    }
};