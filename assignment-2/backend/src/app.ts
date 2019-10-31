import bodyParser from "body-parser";
import express, { Router } from "express";
import mongoose, { mongo } from "mongoose";
import { ApiRouter } from "./apiRouter";

class App {
    public app: express.Application;
    public mongoUrl: string = process.env.MONGODB_URI || "mongodb://localhost/workoutApp";
    public router: Router;

    constructor() {
        this.app = express();
        this.router = new ApiRouter().router;
        this.config();
        this.setupRouter();
        this.setupMongoose();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private setupRouter(): void {
        this.app.use('/', this.router);
    }

    private setupMongoose(): void {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        mongoose.set("useCreateIndex", true);
    }
}

export default new App().app;
