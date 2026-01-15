import { Request, Response } from 'express';
import { promoteUserToAdmin } from '../services/userService.js';

export const updateUserRoleController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body; // Changed to accept email as per request for "promoteUserToAdmin" often taking email/ID

        if (!email) {
            return res.status(400).json({ message: 'Missing email' });
        }

        // We specifically implemented "Promote to Admin" logic. 
        // If generalized role update is needed, the service can be expanded.
        // For now, based on "promoteUserToAdmin" request:
        const user = await promoteUserToAdmin(email);

        res.json({ message: 'User promoted to admin successfully', user });
    } catch (error: any) {
        console.error('Error promoting user:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const getStats = async (req: Request, res: Response) => {
    // Placeholder for admin stats
    res.json({ message: 'Admin stats', stats: { users: 100, sales: 5000 } });
};
