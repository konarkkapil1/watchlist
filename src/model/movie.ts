import mongoose, { Schema, Document } from 'mongoose';
import { Genre } from '../types/genre.js';

interface IMovie extends Document {
    title: string;
    description: string;
    genres: Genre[];
    releaseDate: Date;
    director: string;
    actors: string[];
}

const movieSchema = new Schema<IMovie>({
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
});

const MovieModel = mongoose.model<IMovie>('Movie', movieSchema);

export default MovieModel;