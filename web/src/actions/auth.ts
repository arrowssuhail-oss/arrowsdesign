
'use server';

import { encrypt } from "../lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { message: "Email and Password are required" };
    }

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!data.success) {
            return { message: data.message || "Invalid credentials" };
        }

        // Create Session with data returned from API
        const session = await encrypt({
            email: data.user.email,
            role: data.user.role,
            id: data.user.id
        });

        // Set Cookie
        (await cookies()).set("session", session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            path: "/",
        });

    } catch (e) {
        console.error("Login call failed:", e);
        return { message: e instanceof Error ? e.message : "Connection failed to backend" };
    }

    redirect("/dashboard");
}

export async function logout() {
    (await cookies()).delete("session");
    redirect("/sign-in");
}
