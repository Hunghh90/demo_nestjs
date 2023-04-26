import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { ObjectId } from "mongoose";

export class AuthLoginDto{
    _id:ObjectId

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string
}