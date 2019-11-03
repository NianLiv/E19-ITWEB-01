import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import express, { NextFunction, Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import apiRoutes from './apiRouter';
import User from './user/models/user.model';

// configure environment variables - this should be done as earyly as possible
// env.config();

class App {
  public app: express.Application;
  public mongoUrl: string = process.env.MONGODB_URI || 'mongodb://localhost/workoutApp';
  public router: Router;

  constructor() {
    this.app = express();
    this.router = apiRoutes;
    this.configureApp();
    this.setupCors();
    this.setupRouter();
    this.setupMongoose();
    this.setupErrorHandling();
  }

  private configureApp(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // setup passport
    this.router.use(passport.initialize());
    this.router.use(passport.session());
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
  }

  private setupRouter(): void {
    this.app.use('/api', this.router);
  }

  private setupMongoose(): void {
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useFindAndModify: false });
    mongoose.set('useCreateIndex', true);
  }

  private setupErrorHandling() {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send({ message: 'Unauthorized' });
      } else {
        res.status(500).send({ message: 'Unknown error' });
      }
    });
  }

  private setupCors() {
    const whiteList = ['http://localhost:4200', 'https://workout-app-a2.herokuapp.com'];
    const corsOptions: CorsOptions = {
      origin: (origin, callback) => {
        if (whiteList.indexOf(origin || '') !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    };
    this.app.use(cors(corsOptions));
  }
}

export default new App().app;
