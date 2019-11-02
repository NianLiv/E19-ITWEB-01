import { sign } from 'jsonwebtoken';
import mongoose, { Document, PassportLocalSchema, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { Activity } from '../../activity/activity.model';

export interface IUser {
  _id: any;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  activities: Activity[];
}

export interface LoggedInUser {
  id: any;
  email: string;
  fullName: string;
}

export interface UserModel extends IUser, Document {
  generateJwtToken(): string;
}

export interface UserSignUpDTO {
  firstName: IUser['firstName'];
  lastName: IUser['lastName'];
  email: IUser['email'];
  password: string;
  repeatPassword: string;
}

export interface UserSignInDTO {
  email: IUser['email'];
  password: string;
}

export const userSchema = new Schema<UserModel>(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    activities: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
    },
  },
  {
    timestamps: true,
  },
) as PassportLocalSchema;

userSchema.virtual('fullName').get(function(this: UserModel) {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

userSchema.methods.generateJwtToken = function(this: UserModel) {
  const expiry = Math.floor(new Date().getTime() / 1000 + 3600); // 1 hour;
  return sign(
    {
      id: this._id,
      email: this.email,
      fullName: this.fullName,
      exp: expiry,
    },
    process.env.JWT_SECRET as string,
  );
};

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

export default mongoose.model<UserModel>('User', userSchema);
