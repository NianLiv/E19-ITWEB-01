import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/auth/user.model';
import { WorkoutService } from '../../workout.service';

@Component({
  selector: 'app-create-exercise-dialog',
  templateUrl: './create-exercise-dialog.component.html',
  styleUrls: ['./create-exercise-dialog.component.scss']
})
export class CreateExerciseDialogComponent implements OnInit {
  exerciseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateExerciseDialogComponent>,
    private workoutService: WorkoutService,
    @Inject(MAT_DIALOG_DATA)
    public data: { workoutId: string; currentUser: User }
  ) {}

  ngOnInit() {
    this.exerciseForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      numberOfSets: [0, Validators.required],
      numberOfRepetitions: [0],
      timeInMinutes: [0]
    });
  }

  createNewExercise(): void {
    this.exerciseForm.markAllAsTouched();

    if (this.exerciseForm.invalid) {
      return;
    }

    console.log(this.data.currentUser);

    this.workoutService
      .addExercise(
        this.data.workoutId,
        this.data.currentUser,
        this.exerciseForm.value
      )
      .subscribe(() => this.dialogRef.close());
  }
}
