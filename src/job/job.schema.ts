import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';


export type JobSchema = HydratedDocument<Job>
@Schema()
export class Job{

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
}
export const JobSchema = SchemaFactory.createForClass(Job);