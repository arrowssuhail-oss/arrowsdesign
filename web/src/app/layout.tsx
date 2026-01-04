import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
    title: "Emergent | Fullstack App",
    description: "A product of emergent.sh",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                >
                    <div className="min-h-screen bg-background text-foreground">
                        <Navigation />
                        {children}
                        <Toaster position="top-right" richColors />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
