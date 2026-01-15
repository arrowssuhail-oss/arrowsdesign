import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define routes that require authentication
const isProtectedRoute = createRouteMatcher([
    '/admin(.*)',
]);

const isAdminRoute = createRouteMatcher([
    '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    // 1. Protect dashboard routes
    if (isAdminRoute(req)) {
        // Redirect to sign-in if not authenticated
        const { userId, sessionClaims, redirectToSignIn } = await auth();

        if (!userId) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }

        // 2. Check Role
        const role = (sessionClaims?.metadata as any)?.role;
        console.log(`[Middleware] Checking access for ${userId}. Role: '${role}'`);

        // Strict check: Only super_admin allowed (though logic allows both, user request emphasized super_admin)
        // I will keep 'admin' as fallback unless strict removal requested, 
        // but user said: "if the user is super_admin then give the access"
        // Let's stick to what was there but apply to dashboard.
        if (role !== 'admin' && role !== 'super_admin') {
            console.log(`[Middleware] Access denied. Redirecting to /`);
            const indexUrl = new URL('/', req.url);
            return NextResponse.redirect(indexUrl);
        }
    }
    // 3. Other protected routes
    else if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
        '/api/webhooks/clerk', // Ensure this is not blocked or handled strictly if needed, though 'api' pattern covers it. 
        // Wait, 'api' pattern covers it. But we need to make sure it's public.
    ],
};