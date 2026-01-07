
'use server';

import connectToDatabase from "@/lib/db";
import Project, { IProject } from "@/models/Project";
import { revalidatePath } from "next/cache";

const serialize = (doc: any) => {
    const { _id, ...rest } = doc.toObject ? doc.toObject() : doc;
    return { _id: _id.toString(), ...rest };
};

export async function getProjects() {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return projects.map(serialize);
}

export async function createProject(prevState: any, formData: FormData) {
    await connectToDatabase();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const imagesStr = formData.get("images") as string; // Comma separated URLs for now
    const tagsStr = formData.get("tags") as string; // Comma separated

    if (!title || !description) {
        return { message: "Title and Description are required" };
    }

    const images = imagesStr ? imagesStr.split(',').map(s => s.trim()) : [];
    const tags = tagsStr ? tagsStr.split(',').map(s => s.trim()) : [];

    try {
        await Project.create({
            title,
            description,
            link,
            images,
            tags
        });
        revalidatePath("/dashboard/cms");
        return { message: "Project created successfully" };
    } catch (e) {
        return { message: "Failed to create project" };
    }
}

export async function updateProject(id: string, prevState: any, formData: FormData) {
    await connectToDatabase();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const imagesStr = formData.get("images") as string;
    const tagsStr = formData.get("tags") as string;

    const updateData: Partial<IProject> = {
        title,
        description,
        link,
        // Only update arrays if provided, mostly logic depends on UI but here we just split
        images: imagesStr ? imagesStr.split(',').map(s => s.trim()) : [],
        tags: tagsStr ? tagsStr.split(',').map(s => s.trim()) : []
    };

    await Project.findByIdAndUpdate(id, updateData);
    revalidatePath("/dashboard/cms");
    return { message: "Project updated" };
}

export async function deleteProject(id: string) {
    await connectToDatabase();
    await Project.findByIdAndDelete(id);
    revalidatePath("/dashboard/cms");
}
