
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/password";

export async function GET() {
    try {
        await connectToDatabase();

        // Hardcoded credentials for the prompt
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!password) {
            return NextResponse.json({ success: false, error: "ADMIN_PASSWORD not set in env" }, { status: 500 });
        }

        const hashedPassword = await hashPassword(password);

        // Update or Create
        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                email,
                password: hashedPassword,
                role: 'admin'
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({
            success: true,
            message: "Admin seeded successfully with password."
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Failed to seed: " + error
        }, { status: 500 });
    }
}
