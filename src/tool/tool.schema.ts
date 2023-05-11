import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Job } from "../job/job.schema";


export type ToolDocument = HydratedDocument<Tool>
@Schema({
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class Tool {

    @Prop({unique:true})
    name: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Job', index: true })
    jobId: Job[]

    @Prop({default:1})
    status: number
}
export const ToolSchema = SchemaFactory.createForClass(Tool)