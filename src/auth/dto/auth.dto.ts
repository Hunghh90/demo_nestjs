import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { ObjectId } from "mongoose";

export class AuthDto {

     
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'Password must be at least 8 characters'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password:string
    

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string

   
}