import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export interface IStatusCheck extends Document {
    client_name: string;
    timestamp: Date;
}

const StatusCheckSchema: Schema = new Schema({
    client_name: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IStatusCheck>('StatusCheck', StatusCheckSchema);
