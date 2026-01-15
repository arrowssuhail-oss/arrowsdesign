'use client';
import Navigation from "@/components/Navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import StoryManager from "@/components/dashboard/StoryManager";
import ProjectManager from "@/components/dashboard/ProjectManager";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-black text-foreground selection:bg-accent/30">
            {/* Background Texture */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            <Navigation />

            <main className="relative z-10 pt-32 pb-20 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <DashboardHeader />
                    <StatsCards />

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

                    <StoryManager />

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

                    <ProjectManager />
                </div>
            </main>
        </div>
    );
}
