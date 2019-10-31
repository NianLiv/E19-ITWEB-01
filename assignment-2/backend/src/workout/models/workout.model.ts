import mongoose, { Document, Schema } from "mongoose";
import { Exercise } from "./exercise.model";

export interface Workout extends Document {
    title: string;
    exercises: Exercise[];
}

export const workoutSchema = new Schema<Workout> (
    {
        title: {
            type: String,
            required: true
        },
        exercises: [
            {type: Schema.Types.ObjectId, ref: "Exercise"}
        ]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<Workout>("Workout", workoutSchema);
