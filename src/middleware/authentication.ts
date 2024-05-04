import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from "@konark/common";
import jwt from 'jsonwebtoken';
import { IUser } from 'src/entity/user';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new NotAuthorizedError();
    }

    jwt.verify(token, process.env.JWT_KEY as string, (err, decoded) => {
        if (err) {
            throw new NotAuthorizedError();
        }

        const userPayload = decoded as IUser;
        
        //@ts-ignore
        req.user = userPayload;

        next();
    });
};