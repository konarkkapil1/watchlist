import { Document } from "mongoose";
import { Genre } from "./genre";

export interface ITVShow extends Document {
    id: string;
    title: string;
    description: string;
    genres: Genre[];
    episodes: Array<{
        episodeNumber: number;
        seasonNumber: number;
        releaseDate: Date;
        director: string;
        actors: string[];
    }>;
}