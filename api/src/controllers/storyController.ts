import { Request, Response } from 'express';
import Story from '../models/Story.js';

export const getStories = async (req: Request, res: Response) => {
    try {
        const stories = await Story.find({}).sort({ createdAt: -1 });
        res.json(stories);
    } catch (error) {
        console.error("Error fetching stories:", error);
        res.status(500).json({ error: "Failed to fetch stories" });
    }
};

export const createStory = async (req: Request, res: Response) => {
    try {
        const { mediaUrl, mediaType, caption } = req.body;

        // Calculate expiration (24 hours from now)
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const newStory = await Story.create({
            mediaUrl,
            mediaType: mediaType || 'image',
            caption,
            expiresAt
        });

        res.status(201).json(newStory);
    } catch (error) {
        console.error("Error creating story:", error);
        res.status(500).json({ error: "Failed to create story" });
    }
};

export const deleteStory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Story.findByIdAndDelete(id);
        res.json({ message: "Story deleted successfully" });
    } catch (error) {
        console.error("Error deleting story:", error);
        res.status(500).json({ error: "Failed to delete story" });
    }
};

export const archiveStory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedStory = await Story.findByIdAndUpdate(id, { status: 'archived' }, { new: true });

        if (!updatedStory) {
            res.status(404).json({ error: "Story not found" });
            return;
        }

        res.json(updatedStory);
    } catch (error) {
        console.error("Error archiving story:", error);
        res.status(500).json({ error: "Failed to archive story" });
    }
};
