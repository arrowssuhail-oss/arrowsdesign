'use client';

import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { User as UserIcon, LogOut } from "lucide-react";
import { logout } from "@/actions/auth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
    const { toast } = useToast();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/');
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to sign out",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navigation />
            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <span className="text-accent text-sm font-medium uppercase tracking-widest">User Dashboard</span>
                            <h1 className="text-4xl md:text-5xl font-bold mt-2">Welcome Back</h1>
                            <p className="text-muted-foreground mt-2">Access your account details and projects.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-xl border border-border/50 bg-card">
                            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                                <UserIcon className="w-12 h-12 text-accent" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">My Account</h2>
                            <p className="text-muted-foreground mb-6">Manage your profile and preferences.</p>
                            <Button variant="outline" onClick={handleLogout} className="gap-2 text-rose-500 hover:text-rose-500 hover:bg-rose-500/5 border-rose-200">
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </Button>
                        </div>

                        <div className="p-8 rounded-xl border border-border/50 bg-card flex flex-col justify-center items-center text-center">
                            <h3 className="text-xl font-bold mb-2">Projects</h3>
                            <p className="text-muted-foreground">You don't have any active projects yet.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
