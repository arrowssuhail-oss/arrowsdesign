import { Request, Response } from 'express';
import imagekit from '../lib/imagekit.js';

export const getAuthParameters = (req: Request, res: Response) => {
    try {
        const result = imagekit.getAuthenticationParameters();
        res.json(result);
    } catch (error) {
        console.error("ImageKit Auth Error:", error);
        res.status(500).json({ error: "Failed to generate auth parameters" });
    }
};
