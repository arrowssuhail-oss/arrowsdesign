import express, { Request, Response, Router } from 'express';
import User from '../models/User.js';
import { hashPassword } from '../lib/password.js';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        // Hardcoded credentials for the prompt
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!email || !password) {
            res.status(500).json({ success: false, error: "ADMIN_EMAIL or ADMIN_PASSWORD not set in env" });
            return;
        }

        const hashedPassword = await hashPassword(password);

        // Update or Create
        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                email,
                password: hashedPassword,
                role: 'admin'
            },
            { upsert: true, new: true }
        );

        res.json({
            success: true,
            message: "Admin seeded successfully with password."
        });
    } catch (error) {
        console.error("Seeding error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to seed: " + (error instanceof Error ? error.message : String(error))
        });
    }
});

export default router;
