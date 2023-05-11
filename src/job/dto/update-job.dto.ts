import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";

@Injectable()
export class JobUpdateDto{

    @IsString()
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

}