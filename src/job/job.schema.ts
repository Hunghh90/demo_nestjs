import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../user/user.schema";
import { Tool } from "src/tool/tool.schema";

export type JobDocument = HydratedDocument<Job>
@Schema({
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class Job {

    @Prop({unique:true})
    title: string

    @Prop()
    description: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userId: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tool'})
    toolId: Tool

    @Prop({default:1})
    status: number
}
export const JobSchema = SchemaFactory.createForClass(Job)