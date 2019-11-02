import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';
import { MatDialog } from '@angular/material';
import { CreateWorkoutDialogComponent } from '../create-workout-dialog/create-workout-dialog.component';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {

  workouts$: BehaviorSubject<Workout[] | undefined> = this.workoutService.workouts$;

  constructor(private workoutService: WorkoutService, private dialog: MatDialog) { }

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe();
  }

  private addWorkout(): void {
    const dialogRef = this.dialog.open(CreateWorkoutDialogComponent)
  }

}
