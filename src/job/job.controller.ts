import { 
    Controller,
    Get,
    Patch,
    Post,
    Delete,
    Param,
    Body,
    Req,
    UseGuards,
    Query
     } from '@nestjs/common'
import { JobService } from './job.service';
import { GetUser } from './../auth/decorator';
import { InsertJobDto, UpdateJobDto } from './dto';
import { User } from 'src/auth/auth.schema';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Job } from './job.schema';
@Controller('job')
@ApiTags("Job")
@UseGuards(AuthGuard("jwt"))
export class JobController{
    constructor(private jobService:JobService){}
    
    
    @Get('getJob')
    async getJob(@GetUser("_id") userId:ObjectId) {
        const data = await this.jobService.getJob(userId)
        return data
    }
    
    
    @Get("get/:id")
    async getJobById(@Param('id') jobId:ObjectId) {
        const data = await this.jobService.getJobById(jobId)
        return data
    }
   
    
    @Post('create')
    async createJob(
        @GetUser("_id") userId:ObjectId,
        @Body() insertJobDto:InsertJobDto
    ) {
        const data = await this.jobService.createJob(userId,insertJobDto)
        return data
    }
   
    
    @Patch('update/:id')
    async updateJob(
        @GetUser("_id") userId:ObjectId,
        @Param('id') jobId:ObjectId,
        @Body() updateJobDto:UpdateJobDto
    ) {
        const data = await  this.jobService.updateJob(userId,jobId,updateJobDto)
        return data
    }
    
    
    @Delete('delete/:id')
    async deleteJob(
        @GetUser("_id") userId:ObjectId,
        @Param("id")jobId:ObjectId) {
        const data = await this.jobService.deleteJob(userId,jobId)
        return data
    }
}



