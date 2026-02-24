'use server';

import { encrypt } from "../lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { message: "Email and Password are required" };
    }

    try {
        const client = await clientPromise;
        const db = client.db('arrowsdesign');

        const user = await db.collection("users").findOne({ email });

        if (!user) {
            return { message: "Invalid credentials" };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { message: "Invalid credentials" };
        }

        // Create Session with data returned from DB
        const session = await encrypt({
            email: user.email,
            role: user.role || 'user',
            id: user._id.toString()
        });

        // Set Cookie
        (await cookies()).set("session", session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            path: "/",
        });

    } catch (e) {
        console.error("Login failed:", e);
        return { message: e instanceof Error ? e.message : "Database connection failed" };
    }

    redirect("/dashboard");
}

export async function logout() {
    (await cookies()).delete("session");
    redirect("/sign-in");
}
