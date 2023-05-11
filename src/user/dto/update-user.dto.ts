import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

import { ObjectId } from "mongoose";
import { Permission } from "src/enum/permission.enum";

import { Role } from "src/role/role.schema";


export class UserUpdateDto {

    _id?:ObjectId

    @ApiProperty()
    userName?: string

    @ApiProperty()
    email?: string

    @ApiProperty()
    password?: string

    @ApiProperty()
    refreshToken?: string

    @ApiProperty()
    roles?: Role

    @ApiProperty()
    permissions?: Permission[]

}