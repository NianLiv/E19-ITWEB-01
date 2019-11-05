import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateExerciseDialogComponent } from '../exercise/create-exercise-dialog/create-exercise-dialog.component';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss']
})
export class WorkoutDetailComponent implements OnInit {
  workout$: Observable<Workout>;
  currentUser$ = this.authService.currentUser$;
  workoutId: string;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.workout$ = this.route.params.pipe(
      switchMap(params => {
        this.workoutId = params.id;
        return this.workoutService.getWorkout(this.workoutId);
      })
    );
  }

  addExercise(): void {
    this.dialog
      .open(CreateExerciseDialogComponent, {
        data: { workoutId: this.workoutId }
      })
      .afterClosed()
      .subscribe(() => {
        this.workout$ = this.workoutService.getWorkout(this.workoutId).pipe(
          tap(res => {
            return res;
          })
        );
      });
  }

  logActivity(): void {
    // TODO
  }

  goBack(): void {
    this.router.navigate(['/workout']);
  }
}
