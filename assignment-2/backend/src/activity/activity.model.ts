import { Document, model, Schema } from 'mongoose';
import { IWorkout } from '../workout/models/workout.model';

export interface Activity {
  id: string;
  workout: IWorkout;
  comment?: string;
  createdAt: Date;
}

export interface CreateActivityDTO {
  workoutId: string;
  comment?: string;
}

export interface ActivityModel extends Activity, Document {
  id: any;
}

export const activitySchema = new Schema<Activity>(
  {
    workout: {
      type: Schema.Types.ObjectId,
      ref: 'Workout',
      required: true,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

activitySchema.set('toJSON', { virtuals: true });
activitySchema.set('toObject', { virtuals: true });

export default model<ActivityModel>('Activity', activitySchema);
