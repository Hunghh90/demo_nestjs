import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { AuthLoginDto } from "./auth-login.dto";

export class AuthDto extends AuthLoginDto{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'Password must be at least 8 characters'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password:string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    confirmPassword:string
}