
'use server';

import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function getProjects() {
    try {
        const res = await fetch(`${API_URL}/projects`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch projects');
        return await res.json();
    } catch (error: any) {
        console.error("Error fetching projects:");
        console.error("  Raw API_URL:", API_URL);
        console.error("  Target URL:", `${API_URL}/projects`);
        console.error("  Error Details:", error.message, error.cause);
        return [];
    }
}

export async function createProject(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const imagesStr = formData.get("images") as string;
    const tagsStr = formData.get("tags") as string;

    if (!title || !description) {
        return { message: "Title and Description are required" };
    }

    const images = imagesStr ? imagesStr.split(',').map(s => s.trim()) : [];
    const tags = tagsStr ? tagsStr.split(',').map(s => s.trim()) : [];

    try {
        const res = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, link, images, tags })
        });

        if (!res.ok) throw new Error('Failed to create project');

        revalidatePath("/dashboard/cms");
        return { message: "Project created successfully" };
    } catch (e) {
        return { message: "Failed to create project" };
    }
}

export async function updateProject(id: string, prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const imagesStr = formData.get("images") as string;
    const tagsStr = formData.get("tags") as string;

    const updateData = {
        title,
        description,
        link,
        images: imagesStr ? imagesStr.split(',').map(s => s.trim()) : [],
        tags: tagsStr ? tagsStr.split(',').map(s => s.trim()) : []
    };

    try {
        const res = await fetch(`${API_URL}/projects/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });

        if (!res.ok) throw new Error('Failed to update project');

        revalidatePath("/dashboard/cms");
        return { message: "Project updated" };
    } catch (e) {
        return { message: "Failed to update project" };
    }
}

export async function deleteProject(id: string) {
    try {
        await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
        revalidatePath("/dashboard/cms");
    } catch (e) {
        console.error("Failed to delete project:", e);
    }
}
