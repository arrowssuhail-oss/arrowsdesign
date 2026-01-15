import { clerkMiddleware, requireAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';

// Ensure this middleware is used AFTER clerkMiddleware()
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.auth;

    if (!auth || !auth.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    // Clerk stores metadata in sessionClaims
    const sessionClaims = (auth as any).sessionClaims;
    const role = sessionClaims?.metadata?.role;

    if (role !== 'admin' && role !== 'super_admin') {
        console.warn(`Access denied for user ${auth.userId} with role ${role}`);
        res.status(403).json({ message: 'Forbidden: Admins only' });
        return;
    }

    next();
};
