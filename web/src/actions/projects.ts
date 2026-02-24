'use server';

import { revalidatePath } from "next/cache";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getProjects() {
    try {
        const client = await clientPromise;
        const db = client.db('arrowsdesign');

        const projects = await db.collection("projects").find({}).sort({ createdAt: -1 }).toArray();

        return projects.map(proj => ({
            ...proj,
            _id: proj._id.toString()
        }));
    } catch (error) {
        console.error("Error fetching projects:", error);
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
        const client = await clientPromise;
        const db = client.db('arrowsdesign');

        await db.collection("projects").insertOne({
            title,
            description,
            link,
            images,
            tags,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        revalidatePath("/dashboard/cms");
        return { message: "Project created successfully" };
    } catch (e) {
        console.error("Failed to create project:", e);
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
        tags: tagsStr ? tagsStr.split(',').map(s => s.trim()) : [],
        updatedAt: new Date()
    };

    try {
        const client = await clientPromise;
        const db = client.db('arrowsdesign');

        await db.collection("projects").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        revalidatePath("/dashboard/cms");
        return { message: "Project updated" };
    } catch (e) {
        console.error("Failed to update project:", e);
        return { message: "Failed to update project" };
    }
}

export async function deleteProject(id: string) {
    try {
        const client = await clientPromise;
        const db = client.db('arrowsdesign');

        await db.collection("projects").deleteOne({ _id: new ObjectId(id) });

        revalidatePath("/dashboard/cms");
    } catch (e) {
        console.error("Failed to delete project:", e);
    }
}
