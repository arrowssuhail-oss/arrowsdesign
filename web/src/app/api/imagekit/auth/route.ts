import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';

export async function GET() {
    try {
        const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
        const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
        const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

        if (!publicKey || !privateKey || !urlEndpoint) {
            return NextResponse.json(
                { error: 'ImageKit credentials not configured properly in environment variables.' },
                { status: 500 }
            );
        }

        const imagekit = new ImageKit({
            publicKey,
            privateKey,
            urlEndpoint,
        });

        const authenticationParameters = imagekit.getAuthenticationParameters();

        return NextResponse.json(authenticationParameters);
    } catch (error) {
        console.error("Error generating ImageKit auth parameters:", error);
        return NextResponse.json(
            { error: 'Internal Server Error while generating upload signature' },
            { status: 500 }
        );
    }
}
