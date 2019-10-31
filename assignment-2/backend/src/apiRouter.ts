import { Router } from "express";
import workoutRouter from './workout/workout.routes'

export class ApiRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.setupRouter();
        this.setRoutes();
    }

    private setRoutes(): void {
        this.router.use('/api', workoutRouter);


    }

    private setupRouter(): void {

    }
}