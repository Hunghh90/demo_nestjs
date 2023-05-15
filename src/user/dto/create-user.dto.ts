import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { Role } from "../../enum/roles.enum";
import { ObjectId } from "mongoose";
import { Permission } from "../../enum/permission.enum";
import { Exclude } from "class-transformer";


export class UserCreateDto {

    _id?:ObjectId

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userName: string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'Password must be at least 8 characters'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password :string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    confirmPassword: string

    roles?: Role

    status: string

    refreshToken: string

    permissions?: Permission[]
}