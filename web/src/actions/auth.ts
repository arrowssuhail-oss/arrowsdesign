
'use server';

import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { encrypt } from "@/lib/auth";
import { comparePassword } from "@/lib/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { message: "Email and Password are required" };
    }

    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
        // Security: Don't reveal user existence
        return { message: "Invalid credentials" };
    }

    // If user has no password (migrated from Clerk or seeded without password), fail
    if (!user.password) {
        return { message: "Account setup incomplete. Contact admin." };
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
        return { message: "Invalid credentials" };
    }

    // Create Session
    const session = await encrypt({ email: user.email, role: user.role, id: user._id.toString() });

    // Set Cookie
    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        path: "/",
    });

    redirect("/dashboard");
}

export async function logout() {
    (await cookies()).delete("session");
    redirect("/sign-in");
}
