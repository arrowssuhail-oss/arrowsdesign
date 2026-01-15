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
        await auth.protect();
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