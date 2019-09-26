import express, { Router } from 'express';
import mongoose from "mongoose";
import { AppRouter } from './router';

class App {
    public app : express.Application;
    public mongoUrl: string = 'mongodb://localhost/workoutApp';  
    public router : Router;

    constructor() {
        this.app = express();
        this.router = new AppRouter().router;
        this.config(); 
        this.setupRouter();
        this.setupMongoDB();
    }

    private config(): void {
        this.app.set("views", ['./src', './src/user', './src/workout']);
        this.app.set("view engine", "ejs");
        this.app.use(express.static('src/public'));
    }

    private setupRouter() {
        this.app.use('/', this.router);
    }

    private setupMongoDB(): void {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        mongoose.set("useCreateIndex", true);
    }
}

export default new App().app; 