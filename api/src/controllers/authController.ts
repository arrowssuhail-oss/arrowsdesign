import { Request, Response } from 'express';
import User from '../models/User.js';
import { comparePassword } from '../lib/password.js';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ success: false, message: "Email and Password are required" });
            return;
        }

        const user = await User.findOne({ email });

        if (!user) {
            // Security: Don't reveal user existence
            res.status(401).json({ success: false, message: "Invalid credentials" });
            return;
        }

        if (!user.password) {
            res.status(403).json({ success: false, message: "Account setup incomplete. Contact admin." });
            return;
        }

        const isValid = await comparePassword(password, user.password);

        if (!isValid) {
            res.status(401).json({ success: false, message: "Invalid credentials" });
            return;
        }

        // Return user info so frontend can create session
        // NOTE: In a more coupled system, API might issue token. 
        // Here we just validate and return user data for Next.js to handle session creation.
        res.json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, error: "Login failed" });
    }
};
