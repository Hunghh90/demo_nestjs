import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Permission } from "../permission/permission.schema";

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})
export class Role {
    
    @Prop({unique: true})
    name: string

    @Prop()
    description: string

    @Prop({default: 1})
    status: number

}
export const RoleSchema = SchemaFactory.createForClass(Role)