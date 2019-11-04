import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Workout } from 'src/app/workout/workout.model';
import { ActivityService } from '../activity.service';

export interface CreateActivityDialogData {
  workout: Workout;
}

@Component({
  selector: 'app-create-activity-dialog',
  templateUrl: './create-activity-dialog.component.html',
  styleUrls: ['./create-activity-dialog.component.scss']
})
export class CreateActivityDialogComponent {
  commentControl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<CreateActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateActivityDialogData,
    private service: ActivityService
  ) {}

  createActivity() {
    this.service
      .createActivity({
        workoutId: this.data.workout.id,
        comment: this.commentControl.value
      })
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
