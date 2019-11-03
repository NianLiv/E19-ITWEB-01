import { Exercise } from './exercise/exercise.model';

export interface Workout {
    id: string;
    title: string;
    owner: string;
    exercises?: Exercise[];
}

export interface CreateWorkout {
  title: Workout['title'];
}
