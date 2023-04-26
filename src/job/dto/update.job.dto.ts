import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
export class UpdateJobDto{

    @IsString()
    @IsOptional()
    title?:string

    @IsOptional()
    @IsString()
    description?:string
}