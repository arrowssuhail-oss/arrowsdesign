import { Request, Response } from 'express';
import Project from '../models/Project.js';

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const { title, description, link, images, tags } = req.body;

        const newProject = await Project.create({
            title,
            description,
            link,
            images,
            tags
        });

        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Failed to create project" });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body; // Expecting partial IProject

        const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProject) {
            res.status(404).json({ error: "Project not found" });
            return;
        }

        res.json(updatedProject);
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: "Failed to update project" });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Project.findByIdAndDelete(id);
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: "Failed to delete project" });
    }
};
