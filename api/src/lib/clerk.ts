import { createClerkClient } from '@clerk/clerk-sdk-node';

if (!process.env.CLERK_SECRET_KEY) {
    throw new Error('Missing CLERK_SECRET_KEY');
}

// Explicitly type as any to avoid TS2742 portability issues with pnpm
const clerkClient: any = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

/**
 * Syncs the user's role from MongoDB to Clerk's publicMetadata.
 * This ensures the role is available in the session token.
 */
export const updateUserRole = async (clerkUserId: string, role: 'admin' | 'user' | 'super_admin') => {
    try {
        await clerkClient.users.updateUserMetadata(clerkUserId, {
            publicMetadata: {
                role,
            },
        });
        console.log(`Synced role '${role}' to Clerk user ${clerkUserId}`);
    } catch (error) {
        console.error(`Failed to sync role to Clerk for user ${clerkUserId}:`, error);
        throw error;
    }
};

export default clerkClient;
