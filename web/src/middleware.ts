import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    // Check if the route is protected (dashboard)
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        const session = req.cookies.get('session');

        // If no session cookie, redirect to sign-in
        if (!session) {
            const loginUrl = new URL('/sign-in', req.url);
            // Optional: Add return URL logic if needed
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
