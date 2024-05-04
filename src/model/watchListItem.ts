import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export interface IWatchlistItem extends Document {
    name: string;
    contentId: String;
    contentType: String;
    watchCount: number;
    createdAt: Date;
}

const watchListItem = new Schema<IWatchlistItem>({
    name: {
        type: String,
        required: true
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "contentType",
        required: true,
    },
    contentType: {
        type: String,
        enum: ['TVShow', 'Movie'],
        required: true,
    },
    watchCount: {
        type: Number,
        required: true,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WatchListItem = mongoose.model<IWatchlistItem>('WatchListItem', watchListItem);

export default WatchListItem;