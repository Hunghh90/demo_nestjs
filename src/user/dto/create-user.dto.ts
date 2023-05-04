import { ApiProperty } from "@nestjs/swagger";
import { AuthDto } from "./../../auth/dto";
import { IsNotEmpty, IsString } from "class-validator";

export class  CreateUserDto extends AuthDto {

    
    refreshToken: String

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    confirmPassword: string
}