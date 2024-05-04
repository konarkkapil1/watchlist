import { Router } from 'express';
import { router as watchListRouter } from './watchlist';

export const router = Router();


router.use("/watchlist", watchListRouter);