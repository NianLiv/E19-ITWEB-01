import mongoose, {Schema, Document} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { PassportLocalSchema } from 'mongoose';

export interface User extends Document {
    firstName : string;
    lastName : string;
    email : string;
    fullName: string;
}

export const userSchema = new Schema<User> (
    {
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true, 
            unique: true
        },
    },
    {
        timestamps: true
    }
) as PassportLocalSchema;

userSchema.virtual('fullName').get(function(this: User) {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

export default mongoose.model<User>("User", userSchema);