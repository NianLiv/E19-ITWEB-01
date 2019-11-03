import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateWorkoutDialogComponent } from '../create-workout-dialog/create-workout-dialog.component';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {
  isAuthenticated$ = this.authService.isAuthenticated$.pipe(shareReplay());
  workouts$: BehaviorSubject<Workout[] | undefined> = this.workoutService
    .workouts$;

  constructor(
    private workoutService: WorkoutService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe();
  }

  addWorkout(): void {
    this.dialog.open(CreateWorkoutDialogComponent);
  }
}
