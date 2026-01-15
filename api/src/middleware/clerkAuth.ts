import { clerkMiddleware, requireAuth as requireAuthExpress } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            auth?: {
                userId?: string;
                sessionId?: string;
                getToken: () => Promise<string | null>;
                // Add other claims as needed
            }
        }
    }
}

// This validates the session token and populates req.auth
if (!process.env.CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    console.error('Missing CLERK environment variables in api/.env');
} else {
    console.log('CLERK Keys Loaded:');
    console.log('PK:', process.env.CLERK_PUBLISHABLE_KEY?.substring(0, 15) + '...');
    console.log('SK:', process.env.CLERK_SECRET_KEY?.substring(0, 10) + '...');
    console.log('PK Length:', process.env.CLERK_PUBLISHABLE_KEY.length);
}

export const clerkAuth = clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
    secretKey: process.env.CLERK_SECRET_KEY!
});

// Strict middleware to enforce authentication
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    // Use the requireAuth from the SDK or manual check
    // Since we use clerkMiddleware above, req.auth should be populated.
    // We can re-use the requireAuth middleware or custom check.

    if (!req.auth || !req.auth.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    next();
};
