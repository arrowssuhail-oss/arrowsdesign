import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { getStories } from "@/actions/stories";

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
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    forcedTheme="dark"
                >
                    <div className="min-h-screen bg-background text-foreground">
                        <Navigation stories={stories} />
                        {children}
                        <Toaster position="top-right" richColors />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
