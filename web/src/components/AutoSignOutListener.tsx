'use client';

import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { useEffect, useRef } from 'react';

export default function AutoSignOutListener() {
    const pathname = usePathname();
    const { signOut } = useClerk();
    // Use a ref to store the previous path so we can compare on change
    const prevPathRef = useRef<string | null>(null);

    useEffect(() => {
        const currentPath = pathname;
        const prevPath = prevPathRef.current;

        // If we are navigating AWAY from dashboard (and not just moving within dashboard)
        if (prevPath?.startsWith('/dashboard') && !currentPath?.startsWith('/dashboard')) {
            console.log("Exiting dashboard - Auto Warning / Signing Out");
            // Trigger sign out (which redirects to home usually or reloads)
            signOut({ redirectUrl: '/' });
        }

        // Update the ref for next render
        prevPathRef.current = currentPath;
    }, [pathname, signOut]);

    return null; // This component handles side-effects only
}
