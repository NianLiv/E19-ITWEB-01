import { ObjectId } from 'bson';
import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../../user/models/user.model';
import { Exercise } from './exercise.model';

export interface IWorkout {
  _id: ObjectId;
  title: string;
  exercises: Exercise[];
  owner: IUser;
}

// tslint:disable-next-line: no-empty-interface
export interface Workout extends IWorkout, Document {
  _id: any;
}

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
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
  },
  {
    timestamps: true,
  },
);

workoutSchema.set('toJSON', { virtuals: true, versionKey: false });

export default mongoose.model<Workout>('Workout', workoutSchema);
