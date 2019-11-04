import { Workout } from '../workout/workout.model';

export interface Activity {
  id: string;
  workout: Workout;
  createdAt: Date;
  comment?: string;
}

export interface CreateActivity {
  workoutId: string;
  comment?: string;
}
