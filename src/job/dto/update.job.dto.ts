import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
export class UpdateJobDto{

    @ApiProperty()
    @IsString()
    @IsOptional()
    title?:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?:string

    updatedAt:Date
}