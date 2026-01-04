import { Schema, model, Document } from 'mongoose';

export interface IStatusCheck extends Document {
    client_name: string;
    timestamp: Date;
}

const statusCheckSchema = new Schema<IStatusCheck>({
    client_name: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const StatusCheck = model<IStatusCheck>('StatusCheck', statusCheckSchema);
