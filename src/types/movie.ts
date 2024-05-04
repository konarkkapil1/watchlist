import { Document } from "mongoose";
import { Genre } from "./genre";

export interface IMovie extends Document {
    id: string;
    title: string;
    description: string;
    genres: Genre[];
    releaseDate: Date;
    director: string;
    actors: string[];
}