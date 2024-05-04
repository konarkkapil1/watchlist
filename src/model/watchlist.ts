import mongoose, { Schema, Document } from "mongoose";
import {IWatchlistItem} from "./watchListItem";

export interface IWatchlist extends Document {
    name: string;
    userId: mongoose.Schema.Types.ObjectId;
    watchListItems?: IWatchlistItem[];
    createdAt?: Date;
}

const watchList = new Schema<IWatchlist>({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    watchListItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WatchListItem',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WatchList = mongoose.model<IWatchlist>('WatchList', watchList);

export default WatchList;