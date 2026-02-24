'use server';

import clientPromise from "@/lib/mongodb";

export async function syncUser(userData: { clerkId: string; email?: string; name?: string | null }) {
    try {
        const client = await clientPromise;
        const db = client.db('arrowsdesign');

        const { clerkId, email, name } = userData;

        if (!clerkId || !email) {
            console.error("Missing clerkId or email required for sync");
            return { success: false };
        }

        await db.collection("users").updateOne(
            { clerkId: clerkId },
            {
                $set: {
                    email: email,
                    name: name || '',
                    updatedAt: new Date(),
                },
                $setOnInsert: {
                    clerkId: clerkId,
                    role: 'user', // Default role
                    createdAt: new Date()
                }
            },
            { upsert: true }
        );

        return { success: true };
    } catch (error) {
        console.error("Error syncing user to database:", error);
        return { success: false, error: "Database error" };
    }
}
