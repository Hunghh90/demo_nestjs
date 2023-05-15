import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})
export class Permission {

    @Prop({unique: true})
    name: string

    @Prop()
    description: string

    @Prop({default: 1})
    status: number

}
export const PermissionSchema = SchemaFactory.createForClass(Permission)