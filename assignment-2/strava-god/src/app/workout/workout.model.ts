import { Exercise } from './exercise/exercise.model';

export interface Workout {
    id: string;
    title: string; 
    owner: string;
    exercises?: Exercise[];
}
