import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";
import { Job } from "src/job/job.schema";

@Injectable()
export class ToolCreateDto {
    @IsString()
    @IsNotEmpty()
    title: string

    status: number

    jobId: Job
}