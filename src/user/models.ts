import mongoose, {Schema, Document} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { PassportLocalSchema } from 'mongoose';

export interface User extends Document {
    firstname : string;
    lastName : string;
    email : string;
    password : string;
    fullName: string;
}

export const userSchema = new Schema<User> (
    {
        firstname: {
            type: String,
            trim: true
        },
        lastname: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true, 
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
) as PassportLocalSchema;

userSchema.virtual('fullName').get(function(this: User) {
    return `${this.firstname} ${this.lastName}`;
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

export default mongoose.model<User>("User", userSchema);