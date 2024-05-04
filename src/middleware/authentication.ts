import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from "@konark/common";
import jwt from 'jsonwebtoken';
import { IUser } from '../types/user';
import User from '../model/user';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new NotAuthorizedError();
    }

    jwt.verify(token, process.env.JWT_KEY as string, async (err, decoded) => {
        if (err) {
            throw new NotAuthorizedError();
        }

        const userPayload = decoded as IUser;
        const user = await User.findOne({username: userPayload.username});;
        if (!user) {
            throw new NotAuthorizedError();   
        }
        req.user = {...userPayload, id: user._id} as IUser;

        next();
    });
};

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}