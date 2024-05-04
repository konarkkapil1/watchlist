import { Document } from "mongoose";

export interface IEpisode extends Document{
    episodeNumber: number;
    seasonNumber: number;
    releaseDate: Date;
    director: string;
    actors: string[];
}