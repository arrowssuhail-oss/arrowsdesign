
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Story from "@/models/Story";

export async function GET() {
    try {
        await connectToDatabase();

        // Find all active stories where expiresAt < now
        const now = new Date();
        const result = await Story.updateMany(
            { status: 'active', expiresAt: { $lt: now } },
            { $set: { status: 'archived' } }
        );

        return NextResponse.json({
            success: true,
            message: `Archived ${result.modifiedCount} stories.`
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: "Failed to archive stories"
        }, { status: 500 });
    }
}
