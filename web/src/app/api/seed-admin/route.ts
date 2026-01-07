
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/lib/password";

export async function GET() {
    try {
        await connectToDatabase();

        // Hardcoded credentials for the prompt
        const email = "arrows.suhail@gmail.com";
        const password = "9567@Suhail";

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
