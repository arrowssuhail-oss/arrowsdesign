import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export interface IStatusCheck extends Document {
    client_name: string;
    timestamp: Date;
}
declare const _default: mongoose.Model<IStatusCheck, {}, {}, {}, mongoose.Document<unknown, {}, IStatusCheck, {}, mongoose.DefaultSchemaOptions> & IStatusCheck & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IStatusCheck>;
export default _default;
//# sourceMappingURL=StatusCheck.d.ts.map