import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { AuthLoginDto } from "./auth-login.dto";

export class AuthDto extends AuthLoginDto{
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    confirmPassword:string
}