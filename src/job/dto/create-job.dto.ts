import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { Tool } from "src/tool/tool.schema";
import { User } from "src/user/user.schema";

@Injectable()
export class JobCreateDto{

    @IsString()
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    status: number

    userId: User

    toolId: Tool

}