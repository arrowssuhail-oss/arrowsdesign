
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { getSession } from "@/lib/auth";
import React from "react";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect("/sign-in");
    }

    const email = session.email;

    await connectToDatabase();
    const authorizedUser = await User.findOne({ email });

    if (!authorizedUser) {
        redirect("/dashboard/unauthorized");
    }

    return (
        <div className="flex h-screen w-full flex-col">
            <header className="flex items-center justify-between border-b px-6 py-4">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{email}</span>
                    <form action={async () => {
                        "use server";
                        // We need to import logout but we can't import server action directly into client event handler 
                        // nicely without excessive boilerplate or client component. 
                        // Simplest is a small form pointing to the action we created.
                        const { logout } = await import("@/actions/auth");
                        await logout();
                    }}>
                        <button className="text-sm text-red-600 hover:underline">Sign Out</button>
                    </form>
                </div>
            </header>
            <main className="flex-1 overflow-auto p-6">
                {children}
            </main>
        </div>
    );
}
