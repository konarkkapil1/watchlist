import { Request, Response, Router } from 'express';
import { router as watchListRouter } from './watchlist';
import { authenticateToken } from 'src/middleware/authentication';

export const router = Router();


router.use("/watchlist", watchListRouter);