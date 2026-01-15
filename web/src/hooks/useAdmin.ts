import { useAuth } from "@clerk/nextjs";

export const useAdmin = () => {
    const { isLoaded, userId, sessionClaims } = useAuth();

    // Read directly from the session claims (JWT)
    // This requires "metadata" to be customized in the Clerk Dashboard
    const role = (sessionClaims?.metadata as any)?.role || null;

    const isAdmin = isLoaded && !!userId && (role === 'admin' || role === 'super_admin');
    const isSuperAdmin = isLoaded && !!userId && role === 'super_admin';

    return {
        isAdmin,
        isSuperAdmin,
        role,
        isLoaded,
    };
};
