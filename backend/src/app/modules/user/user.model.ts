import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            select: 0,
        },
        profilePhoto: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export const User = model<IUser>('User', userSchema);
