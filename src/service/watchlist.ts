import mongoose from "mongoose";
import WatchList, { IWatchlist } from "../model/watchlist";
import WatchListItem, { IWatchlistItem } from "../model/watchListItem";
import { BadRequestError } from "@konark/common";

export default class WatchListService {
    constructor() {
    }

    public async getWatchList(userId: string, id?: string): Promise<IWatchlist[]> {
        const watchList = await WatchList.find({userId: new mongoose.Types.ObjectId(userId)}).populate("watchListItems");
        
        console.log(`watchliss:`, watchList)
        return watchList;
    }

    public async createWatchList(userId: string, name: string): Promise<IWatchlist> {
        const watchList = new WatchList({
            name: name,
            userId: new mongoose.Types.ObjectId(userId),
            watchListItems: new WatchListItem()
        });

        const response = await watchList.save();

        return response;
    }

    public async updateWatchList(userId: string, watchListId: string, watchListItem: IWatchlistItem) {
        const watchList = await WatchList.findOne({_id: new mongoose.Types.ObjectId(watchListId)});
        if (!watchList) {
            throw new BadRequestError("Watch list does not exists");
        }

        const updatedWatchList = new WatchList({
            _id: new mongoose.Types.ObjectId(watchListId),
            watchListItems: new WatchListItem(watchListItem)
        })

        const response = await updatedWatchList.updateOne();

        return response;
    }
}