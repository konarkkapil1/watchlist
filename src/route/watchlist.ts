import { Request, Response, Router } from 'express';
import WatchListService from '../service/watchlist';

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const watchLists = await new WatchListService().getWatchList(req.user.id);
        return res.status(200).json(watchLists);
    } catch(Exception) {
        console.log(`exception occured: `, Exception);
        return res.status(500).json(Exception);
    }
})

router.post("/", async (req: Request, res: Response) => {
    try {
        const result = await new WatchListService().createWatchList(req.user.id, req.body.name);
        return res.status(200).json(result);
    } catch (Exception) {
        return res.status(500).json(Exception);
    }
})

router.patch("/", async (req: Request, res: Response) => {
    try {
        const result = await new WatchListService().updateWatchList(req.user.id, req.body.watchListId, req.body.watchListItem);
        return res.status(200).json(result);
    } catch (Exception) {
        return res.status(500).json(Exception);
    }
})

router.delete("/", async (req: Request, res: Response) => {
    return res.status(200).json({message: "success"});
})