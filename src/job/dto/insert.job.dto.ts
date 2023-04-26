import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsObject, IsString } from "class-validator";
import { Date, ObjectId, isValidObjectId } from "mongoose";

export class InsertJobDto{
    @IsString()
    @IsNotEmpty()
    title:string

    @IsString()
    description:string

   
    email:string


    userId:ObjectId

    createdAt:Date

}