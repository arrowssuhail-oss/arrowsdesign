import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/sonner";
import AuthSyncWrapper from "@/components/AuthSyncWrapper";
import AutoSignOutListener from "@/components/AutoSignOutListener";
import "./globals.css";
import { getStories } from "@/actions/stories";
import { ClerkProvider } from "@clerk/nextjs";
import SmoothScroll from "@/components/SmoothScroll";
import MagneticWrapper from "@/components/ui/magnetic-wrapper";
import WhatsAppBtn from "@/components/WhatsAppBtn";

export const metadata: Metadata = {
    title: "Portfolio of Muhammed Suhail",
    description: "Graphic Designer, Video Editor, Web Design & Branding",
    // keywords: "Graphic Designer, Video Editor, Web Design & Branding",
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
                                <Analytics />
                                <div className="fixed bottom-6 right-6 z-50">
                                    <MagneticWrapper>
                                        <WhatsAppBtn />
                                    </MagneticWrapper>
                                </div>
                            </div>
                        </AuthSyncWrapper>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
