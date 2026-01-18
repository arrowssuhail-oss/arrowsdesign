import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/sonner";
import AuthSyncWrapper from "@/components/AuthSyncWrapper";
import AutoSignOutListener from "@/components/AutoSignOutListener";
import "./globals.css";
import { getStories } from "@/actions/stories";
import { ClerkProvider } from "@clerk/nextjs";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
    title: "Arrows Design",
    description: "Portfolio of Arrows Design - A multi-disciplinary designer crafting minimal, meaningful digital experiences. UI/UX, Brand Identity & Motion Design.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const stories = await getStories();

    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                        forcedTheme="dark"
                    >
                        <SmoothScroll />
                        {/* AuthSyncWrapper ensures user is created in MongoDB on first visit */}
                        <AuthSyncWrapper>
                            <AutoSignOutListener />
                            <div className="min-h-screen bg-background text-foreground">
                                <Navigation stories={stories} />
                                {children}
                                <Toaster position="top-right" richColors />
                                <SpeedInsights />
                            </div>
                        </AuthSyncWrapper>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
