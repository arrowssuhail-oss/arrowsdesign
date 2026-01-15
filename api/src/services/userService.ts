import User from '../models/User.js';
import clerkClient, { updateUserRole } from '../lib/clerk.js';

/**
 * Promotes a user to admin by updating MongoDB and Clerk Metadata.
 * This is the distinct "Role Synchronization" mechanism requested.
 */
export const promoteUserToAdmin = async (email: string) => {
    // 1. Find user in MongoDB
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error(`User with email ${email} not found in database.`);
    }

    if (!user.clerkId) {
        throw new Error(`User ${email} has no clerkId. Cannot sync role to Clerk.`);
    }

    // 2. Update MongoDB Role
    user.role = 'admin';
    await user.save();
    console.log(`[DB] Updated user ${email} role to 'admin'`);

    // 3. Update Clerk publicMetadata
    // We reuse the helper we created in lib/clerk.ts, or call clerkClient directly.
    // Using the helper ensures consistency.
    await updateUserRole(user.clerkId, 'admin');
    console.log(`[Clerk] Synced 'admin' role to publicMetadata for ${user.clerkId}`);

    return user;
};
