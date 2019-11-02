import { Component, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';
import { Workout } from './workout.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {

  workouts$ = this.workoutService.workouts$;
  isAuthenticated$ = this.authService.isAuthenticated$;

  constructor(private workoutService: WorkoutService, private authService: AuthService) { }

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe();
  }

  private createWorkout(): void {
    console.log("DAVS");
  }

}
