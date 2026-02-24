'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useRef } from 'react';
import { syncUser } from '@/actions/users';

/**
 * AuthSyncWrapper
 * 
 * This component runs once when the user authenticates.
 * It calls the server action `syncUser` to ensure the user exists in MongoDB.
 */
export default function AuthSyncWrapper({ children }: { children: React.ReactNode }) {
    const { isSignedIn, user } = useUser();
    const hasSynced = useRef(false);

    useEffect(() => {
        const performSync = async () => {
            if (isSignedIn && user && !hasSynced.current) {
                try {
                    const result = await syncUser({
                        clerkId: user.id,
                        email: user.primaryEmailAddress?.emailAddress,
                        name: user.fullName,
                    });

                    if (result.success) {
                        console.log('User synced to MongoDB via Server Action');
                        hasSynced.current = true;
                    } else {
                        console.error('Failed to sync user via Server Action:', result.error);
                    }
                } catch (error) {
                    console.error('Error syncing user:', error);
                }
            }
        };

        performSync();
    }, [isSignedIn, user]);

    return <>{children}</>;
}
