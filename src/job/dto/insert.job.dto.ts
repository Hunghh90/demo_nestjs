import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsObject, IsString } from "class-validator";
import { Date, ObjectId, isValidObjectId } from "mongoose";

export class InsertJobDto{
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string

    
    @ApiProperty()
    @IsString()
    description: string

   
    @ApiProperty()
    email: string


    userId: ObjectId

    createdAt: Date

}