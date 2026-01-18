'use client';

import { useUser, useAuth } from '@clerk/nextjs';
import { useEffect, useRef } from 'react';

/**
 * AuthSyncWrapper
 * 
 * This component runs once when the user authenticates.
 * It calls the backend /api/auth/sync endpoint to ensure the user exists in MongoDB.
 * This effectively implements the "Lazy Creation" pattern without Webhooks.
 */
export default function AuthSyncWrapper({ children }: { children: React.ReactNode }) {
    const { isSignedIn, user } = useUser();
    const { getToken } = useAuth();
    const hasSynced = useRef(false);

    useEffect(() => {
        const syncUser = async () => {
            // Temporary disable backend sync for Vercel deployment
            /*
            if (isSignedIn && user && !hasSynced.current) {
                try {
                    const token = await getToken();

                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/sync`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            clerkId: user.id,
                            email: user.primaryEmailAddress?.emailAddress,
                            name: user.fullName,
                        }),
                    });

                    if (res.ok) {
                        console.log('User synced to MongoDB');
                        hasSynced.current = true;
                    } else {
                        const errText = await res.text();
                        console.error('Failed to sync user:', res.status, errText);
                    }
                } catch (error) {
                    console.error('Error syncing user:', error);
                }
            }
            */
        };

        syncUser();
    }, [isSignedIn, user, getToken]);

    return <>{children}</>;
}
