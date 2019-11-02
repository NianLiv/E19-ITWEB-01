import { Component, OnInit, Input } from '@angular/core';
import { Workout } from '../workout.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
  styleUrls: ['./workout-item.component.scss']
})
export class WorkoutItemComponent {
  @Input() workout!: Workout;

  constructor(private router: Router) { }

  private viewWorkout(): void {
    this.router.navigate(['/workout', this.workout.id]);
  }

}
