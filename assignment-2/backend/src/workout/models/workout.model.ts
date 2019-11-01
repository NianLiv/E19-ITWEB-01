import mongoose, { Document, Schema } from 'mongoose';
import { Exercise } from './exercise.model';

export interface IWorkout {
  _id: any;
  title: string;
  exercises: Exercise[];
  owner: string;
}

// tslint:disable-next-line: no-empty-interface
export interface Workout extends IWorkout, Document {}

export type WorkoutDTO = Pick<IWorkout, '_id' | 'title' | 'owner'>;

export interface CreateWorkoutDTO {
  title?: IWorkout['title'];
}

export const workoutSchema = new Schema<Workout>(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Workout>('Workout', workoutSchema);
