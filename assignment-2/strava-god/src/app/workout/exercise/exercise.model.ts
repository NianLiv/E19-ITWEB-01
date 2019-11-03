export interface Exercise {
  id: any;
  name: string;
  description: string;
  numberOfSets: number;
  numberOfRepetitions: number;
  timeInMinutes: number;
}

export type CreateExercise = Omit<Exercise, 'id'>;
