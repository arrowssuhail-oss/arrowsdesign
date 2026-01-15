
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password?: string; // Optional for now to support old users or if we add OAuth later, but for this flow it's key.
    name?: string;
    role: 'admin' | 'user' | 'super_admin';
    clerkId?: string;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    name: { type: String, required: false },
    role: { type: String, enum: ['admin', 'user', 'super_admin'], default: 'user' },
    clerkId: { type: String, unique: true, sparse: true },
    createdAt: { type: Date, default: Date.now },
});

// Prevent overwrite on hot reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
