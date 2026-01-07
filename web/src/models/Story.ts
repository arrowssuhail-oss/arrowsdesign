
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IStory extends Document {
    mediaUrl: string;
    mediaType: 'image' | 'video';
    caption?: string;
    status: 'active' | 'archived';
    createdAt: Date;
    expiresAt: Date;
}

const StorySchema = new Schema<IStory>({
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ['image', 'video'], required: true },
    caption: { type: String },
    status: { type: String, enum: ['active', 'archived'], default: 'active' },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }, // Will be set to createdAt + 24h
});

// Index for efficient querying of active/archived stories
StorySchema.index({ status: 1, expiresAt: 1 });

const Story: Model<IStory> = mongoose.models.Story || mongoose.model<IStory>('Story', StorySchema);

export default Story;
