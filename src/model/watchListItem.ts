import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export interface IWatchlistItem extends Document {
    contentId: String;
    contentType: String;
    watchCount: number;
    createdAt: Date;
}

const watchListItem = new Schema<IWatchlistItem>({
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    contentType: {
        type: String,
        enum: ['tvshow', 'movie'],
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