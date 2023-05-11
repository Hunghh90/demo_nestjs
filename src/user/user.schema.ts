import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Permission } from "src/enum/permission.enum";

import { Job } from "src/job/job.schema";

import { Role } from "src/role/role.schema";


export type UserDocument = HydratedDocument<User>
@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})
export class User {
    _id?:ObjectId

    @Prop()
    userName: string
    
    @Prop({unique: true})
    email: string

    @Prop()
    password: string

    @Prop({default:1})
    status: number

    @Prop()
    refreshToken: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Role'})
    roles: Role

    @Prop()
    permissions: [Permission]

}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'userId',
    justOne: false
});