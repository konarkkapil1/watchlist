import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from '../types/genre';
import { IEpisode } from '../types/episode';

interface ITVShow extends Document {
    title: string;
    description: string;
    genres: Genre[];
    episodes: IEpisode[];
}

const tvShowSchema = new Schema<ITVShow>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genres: [{
        name: {
            type: String,
            required: true
        }
    }],
    episodes: [{
        episodeNumber: {
            type: Number,
            required: true
        },
        seasonNumber: {
            type: Number,
            required: true
        },
        releaseDate: {
            type: Date,
            required: true
        },
        director: {
            type: String,
            required: true
        },
        actors: [{
            type: String,
            required: true
        }]
    }]
});

const TVShowModel = mongoose.model<ITVShow>('TVShow', tvShowSchema);

export default TVShowModel;