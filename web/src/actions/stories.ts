'use server';

import { revalidatePath } from "next/cache";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getStories() {
    try {
        const client = await clientPromise;
        const db = client.db('arrowsdesign');

        // Fetch stories that are explicitly NOT archived, or where archived doesn't exist
        const stories = await db.collection("stories").find({ archived: { $ne: true } }).sort({ createdAt: -1 }).toArray();

        return stories.map(story => ({
            ...story,
            _id: story._id.toString()
        }));
    } catch (error) {
        console.error("Error fetching stories:", error);
        return [];
    }
}

export async function createStory(prevState: any, formData: FormData) {
    const mediaUrl = formData.get("mediaUrl") as string;
    const mediaType = formData.get("mediaType") as string;
    const caption = formData.get("caption") as string;

    if (!mediaUrl) {
        return { message: "Media URL is required" };
    }

    try {
        const client = await clientPromise;
        const db = client.db('arrowsdesign');

        await db.collection("stories").insertOne({
            mediaUrl,
            mediaType,
            caption: caption || '',
            archived: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        revalidatePath("/dashboard/stories");
        return { message: "Story created successfully" };
    } catch (e) {
        console.error("Failed to create story:", e);
        return { message: "Failed to create story" };
    }
}

export async function deleteStory(id: string) {
    try {
        const client = await clientPromise;
        const db = client.db('arrowsdesign');

        await db.collection("stories").deleteOne({ _id: new ObjectId(id) });

        revalidatePath("/dashboard/stories");
    } catch (e) {
        console.error("Failed to delete story:", e);
    }
}

export async function archiveStory(id: string) {
    try {
        const client = await clientPromise;
        const db = client.db('arrowsdesign');

        await db.collection("stories").updateOne(
            { _id: new ObjectId(id) },
            { $set: { archived: true, updatedAt: new Date() } }
        );

        revalidatePath("/dashboard/stories");
    } catch (e) {
        console.error("Failed to archive story:", e);
    }
}
