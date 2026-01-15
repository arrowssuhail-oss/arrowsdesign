import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { comparePassword } from '../lib/password.js';
import { updateUserRole } from '../lib/clerk.js';

export const sync = async (req: Request, res: Response) => {
    try {
        const { clerkId, email, name } = req.body;

        if (!clerkId || !email) {
            return res.status(400).json({ message: 'Missing required fields: clerkId or email' });
        }

        // Try to find user by clerkId or email
        let user = await User.findOne({ $or: [{ clerkId }, { email }] });

        if (user) {
            // Update existing user
            user.clerkId = clerkId;
            user.email = email;
            if (name) user.name = name;
            await user.save();

            // Ensure Clerk metadata matches DB role (e.g. if manually updated in DB)
            try {
                await updateUserRole(clerkId, user.role);
            } catch (err) {
                console.error('Failed to sync existing user role', err);
            }
        } else {
            // Create new user
            user = await User.create({
                clerkId,
                email,
                name,
                role: 'user', // Default role
            });

            // Sync initial role to Clerk
            try {
                // Determine role from DB (user)
                await updateUserRole(clerkId, 'user');
            } catch (err) {
                console.error('Failed to sync initial role', err);
            }
        }

        res.status(200).json({ message: 'User synced successfully', user });
    } catch (error) {
        console.error('Error syncing user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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
