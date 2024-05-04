import { Request, Response, Router } from 'express';
import User from "../model/user";
import { authenticateToken } from '../middleware/authentication';

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
    await User.find({});
    return res.status(200).json({message: "success"});
})

router.get("/", async (req: Request, res: Response) => {
    return res.status(200).json({message: "success"});
})

router.delete("/", async (req: Request, res: Response) => {
    return res.status(200).json({message: "success"});
})