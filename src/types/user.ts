import { Document } from 'mongoose';
import { Genre } from './genre';

export interface IUser extends Document {
    id: string;
    username: string;
    password: String;
    fullName: String;
    createdAt: Date;
    isActive: Boolean;
    preferences?: Preferences;
    watchHistory?: Array<WatchHistoryItem>;
}


export interface WatchHistoryItem {
    contentId: string;
    watchedOn: Date;
    rating?: number;
}

export interface Preferences {
    favoriteGenres?: Genre[];
    dislikedGenres?: Genre[];
}
