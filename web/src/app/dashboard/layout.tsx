import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const user = await currentUser();

    if (!user) {
        redirect("/");
    }

    const role = user.publicMetadata.role;

    if (role !== 'super_admin' && role !== 'admin') {
        redirect("/");
    }

    return (
        <>
            {children}
        </>
    );
}
