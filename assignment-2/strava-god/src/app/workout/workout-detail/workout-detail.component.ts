import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from '../workout.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss']
})
export class WorkoutDetailComponent implements OnInit {
  private workout: Workout;

  constructor(private workoutService: WorkoutService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let workoutId = params.get('id');
      this.workoutService.getSingleWorkout(workoutId).subscribe(res => {
        this.workout = res;
      })
    });
  }

  private goBack(): void {
    this.router.navigate(['/workout'])
  }

}
