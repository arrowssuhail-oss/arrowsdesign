
'use server';

import connectToDatabase from "@/lib/db";
import Story, { IStory } from "@/models/Story";
import { revalidatePath } from "next/cache";

// Helper to serialize Mongoose doc
const serialize = (doc: any) => {
    const { _id, ...rest } = doc.toObject ? doc.toObject() : doc;
    return { _id: _id.toString(), ...rest };
};

export async function getStories() {
    await connectToDatabase();
    const stories = await Story.find({}).sort({ createdAt: -1 });
    return stories.map(serialize);
}

export async function createStory(prevState: any, formData: FormData) {
    await connectToDatabase();

    const mediaUrl = formData.get("mediaUrl") as string;
    const mediaType = formData.get("mediaType") as string;
    const caption = formData.get("caption") as string;

    // Basic validation
    if (!mediaUrl) {
        return { message: "Media URL is required" };
    }

    // Calculate expiration (24 hours from now)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    try {
        await Story.create({
            mediaUrl,
            mediaType: mediaType || 'image',
            caption,
            expiresAt
        });
        revalidatePath("/dashboard/stories");
        return { message: "Story created successfully" };
    } catch (e) {
        return { message: "Failed to create story" };
    }
}

export async function deleteStory(id: string) {
    await connectToDatabase();
    await Story.findByIdAndDelete(id);
    revalidatePath("/dashboard/stories");
}

export async function archiveStory(id: string) {
    await connectToDatabase();
    await Story.findByIdAndUpdate(id, { status: 'archived' });
    revalidatePath("/dashboard/stories");
}
