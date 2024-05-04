import mongoose from "mongoose";
import WatchList, { IWatchlist } from "../model/watchlist";
import WatchListItem, { IWatchlistItem } from "../model/watchListItem";
import { BadRequestError } from "@konark/common";

export default class WatchListService {
    constructor() {
    }

    public async getWatchList(userId: string, id?: string): Promise<IWatchlist[]> {
        const pipeline = [
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: 'watchlistitems', // Name of the WatchlistItem collection
                    localField: 'watchListItems', // Field in the Watchlist collection
                    foreignField: '_id', // Field in the WatchlistItem collection
                    as: 'watchlistItems' // Alias for the joined documents
                }
            },
            {
                $unwind: '$watchlistItems'
            },
            {
                $lookup: {
                    from: "movie",
                    localField: 'watchlistItems.contentId',
                    foreignField: '_id',
                    as: 'movie'
                }
            },
            {
                $lookup: {
                    from: "tvshow",
                    localField: 'watchlistItems.contentId',
                    foreignField: '_id',
                    as: 'tvshow'
                }
            },
            {
                $unwind: { path: '$movie', preserveNullAndEmptyArrays: true}
            },
            {
                $unwind: { path: '$tvshow', preserveNullAndEmptyArrays: true}
            },
            {
                $group: {
                    _id: '$_id',
                    watchLists: { $push: '$watchlistItems' },
                    movies: { $push: '$movie'}
                }
            }
        ];
        
        let result = await WatchList.aggregate(pipeline);

        return result;
    }

    public async createWatchList(userId: string, name: string): Promise<IWatchlist> {
        const watchList = new WatchList({
            name: name,
            userId: new mongoose.Types.ObjectId(userId),
        });

        const response = await watchList.save();

        return response;
    }

    public async updateWatchList(userId: string, watchListId: string, watchListItem: IWatchlistItem) {
        const watchList = await WatchList.findOne({_id: new mongoose.Types.ObjectId(watchListId), userId: new mongoose.Types.ObjectId(userId)});
        if (!watchList) {
            throw new BadRequestError("Watch list does not exists");
        }

        let session = null
        try {
            session = await mongoose.startSession();
            session.startTransaction();

            const newWatchListItem = new WatchListItem(watchListItem);
            const insertedWatchListItem = await newWatchListItem.save();
            console.log(`insertedWatchListItem: `, insertedWatchListItem);
            
            const updatedWatchList = await WatchList.updateOne({_id: new mongoose.Types.ObjectId(watchListId)}, {watchListItems: insertedWatchListItem});

            return updatedWatchList;
        } catch (Exception) {
            if (session) {
                await session.abortTransaction();
            }
            throw Exception;
        }
    }
}