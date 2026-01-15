import { Request, Response, NextFunction } from 'express';

export const requireSyncSecret = (req: Request, res: Response, next: NextFunction) => {
    const secret = req.headers['x-sync-secret'];
    const expectedSecret = process.env.SYNC_SECRET;

    if (!secret || secret !== expectedSecret) {
        res.status(401).json({ message: 'Unauthorized: Invalid Sync Secret' });
        return;
    }
    next();
};
