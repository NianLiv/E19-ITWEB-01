import { User } from '../auth/user.model';
import { Exercise } from './exercise/exercise.model';

export interface Workout {
  id: string;
  title: string;
  owner: User;
  createdAt: Date;
  exercises?: Exercise[];
}

export interface CreateWorkout {
  title: Workout['title'];
}
