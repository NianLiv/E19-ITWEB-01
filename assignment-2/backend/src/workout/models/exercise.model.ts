import mongoose, { Document, Schema } from 'mongoose';

export interface IExercise {
  _id: any;
  name: string;
  description: string;
  numberOfSets: number;
  numberOfRepetitions: number;
  timeInMinutes: number;
}

export type CreateExerciseDTO = Omit<IExercise, '_id'>;

export interface Exercise extends IExercise, Document {}

export const exerciseSchema = new Schema<Exercise>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    numberOfSets: {
      type: Number,
    },
    numberOfRepetitions: {
      type: Number,
    },
    timeInMinutes: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Exercise>('Exercise', exerciseSchema);
