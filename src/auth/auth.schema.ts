import { Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from 'mongoose';


export type AuthSchema = HydratedDocument<User>
@Schema()
export class User{
    _id?:ObjectId
    @Prop()
    email:string

    @Prop()
    password:string
}
export const UserSchema = SchemaFactory.createForClass(User);