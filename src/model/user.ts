import mongoose from "mongoose";
import { IUser } from "../types/user.js";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    preferences: {
        favoriteGenres: [{
            name: {
                type: String,
                required: true
            }
        }],
        dislikedGenres: [{
            name: {
                type: String,
                required: true
            }
        }]
    },
    watchHistory: [{
        contentId: {
            type: String,
            required: true
        },
        watchedOn: {
            type: Date,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;