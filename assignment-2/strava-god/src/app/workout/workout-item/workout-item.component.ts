import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Workout } from '../workout.model';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
  styleUrls: ['./workout-item.component.scss']
})
export class WorkoutItemComponent {
  @Input() workout!: Workout;

  constructor(private router: Router) {}

  viewWorkout(): void {
    this.router.navigate(['/workout', this.workout.id]);
  }
}
