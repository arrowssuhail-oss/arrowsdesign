
'use server';

import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function getStories() {
    try {
        const res = await fetch(`${API_URL}/stories`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch stories');
        return await res.json();
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
        const res = await fetch(`${API_URL}/stories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mediaUrl, mediaType, caption })
        });

        if (!res.ok) throw new Error('Failed to create story');

        revalidatePath("/dashboard/stories");
        return { message: "Story created successfully" };
    } catch (e) {
        return { message: "Failed to create story" };
    }
}

export async function deleteStory(id: string) {
    try {
        await fetch(`${API_URL}/stories/${id}`, { method: 'DELETE' });
        revalidatePath("/dashboard/stories");
    } catch (e) {
        console.error("Failed to delete story:", e);
    }
}

export async function archiveStory(id: string) {
    try {
        await fetch(`${API_URL}/stories/${id}/archive`, { method: 'PATCH' });
        revalidatePath("/dashboard/stories");
    } catch (e) {
        console.error("Failed to archive story:", e);
    }
}
