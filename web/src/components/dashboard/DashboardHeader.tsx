'use client';
import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
    const { user } = useUser();
    const { signOut } = useClerk();

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 animate-in slide-in-from-top-4 duration-700">
            <div>
                <span className="text-accent text-xs font-bold uppercase tracking-[0.2em] bg-accent/5 px-4 py-1.5 rounded-full border border-accent/20">
                    Command Center
                </span>
                <h1 className="text-4xl md:text-6xl font-black mt-6 tracking-tight">
                    Welcome, <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">{user?.firstName || user?.primaryEmailAddress?.emailAddress?.split('@')[0]}</span>
                </h1>
                <p className="text-muted-foreground mt-3 text-lg font-light max-w-xl">
                    Manage your creative empire from one centralized hub.
                </p>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    onClick={() => signOut({ redirectUrl: '/' })}
                    className="h-12 px-6 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:text-rose-400 text-muted-foreground transition-all duration-300 group backdrop-blur-md"
                >
                    <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
