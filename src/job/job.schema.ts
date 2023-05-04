import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';



export type JobSchema = HydratedDocument<Job>
@Schema()
export class Job {
    // _id: string
    
    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    email?: string

 

    @Prop({ type: mongoose.Schema.Types.ObjectId})
    userId: ObjectId;

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}
export const JobSchema = SchemaFactory.createForClass(Job);