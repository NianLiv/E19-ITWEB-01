import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss']
})
export class WorkoutDetailComponent implements OnInit {
  workout$: Observable<Workout>;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.workout$ = this.route.params.pipe(
      switchMap(params => {
        const workoutId = params.id;
        return this.workoutService.getWorkout(workoutId);
      })
    );
  }

  addExercise(): void {
    // TODO
  }

  logActivity(): void {
    // TODO
  }

  goBack(): void {
    this.router.navigate(['/workout']);
  }
}
