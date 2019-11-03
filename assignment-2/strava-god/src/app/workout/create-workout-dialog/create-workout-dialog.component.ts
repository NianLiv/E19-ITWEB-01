import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-create-workout-dialog',
  templateUrl: './create-workout-dialog.component.html',
  styleUrls: ['./create-workout-dialog.component.scss']
})
export class CreateWorkoutDialogComponent {
  titleControl = new FormControl('', [Validators.required]);

  constructor(
    private workoutService: WorkoutService,
    private dialogRef: MatDialogRef<CreateWorkoutDialogComponent>
  ) {}

  createNewWorkout() {
    this.titleControl.markAllAsTouched();

    if (this.titleControl.invalid) {
      return;
    }

    this.workoutService
      .addWorkout({ title: this.titleControl.value })
      .subscribe(() => this.dialogRef.close());
  }
}
