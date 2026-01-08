
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    images: string[];
    tags: string[];
    link?: string;
    createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    link: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
