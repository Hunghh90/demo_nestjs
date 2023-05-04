import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UpdateUserDto {

    @ApiProperty()
    @IsEmail()
    email?: string
    
    @ApiProperty()
    @IsString()
    refreshToken?: String
}