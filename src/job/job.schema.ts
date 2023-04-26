import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from 'mongoose';


export type JobSchema = HydratedDocument<Job>
@Schema()
export class Job{
    _id:ObjectId
    
    @Prop()
    title:string

    @Prop()
    description:string

    @Prop()
    email?:string

    @Prop()
    userId?:string

    @Prop()
    createdAt:Date

    @Prop()
    updatedAt:Date
}
export const JobSchema = SchemaFactory.createForClass(Job);