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
@Controller('job')
export class JobController{
    constructor(private jobService:JobService){}
    @UseGuards(AuthGuard("jwt"))
    @Get('getJob')
    getJob(@GetUser("_id") user:ObjectId){
        return this.jobService.getJob(user)
    }
    @UseGuards(AuthGuard("jwt"))
    @Get(":id")
    getJobById(@Param('_id') jobId:ObjectId){
        return this.jobService.getJobById(jobId)
    }
    @UseGuards(AuthGuard("jwt"))
    @Post('create')
    createJob(
        @GetUser("_id") userId:ObjectId,
        @Body() insertJobDto:InsertJobDto
    ){
        return this.jobService.createJob(userId,insertJobDto)
    }
    @UseGuards(AuthGuard("jwt"))
    @Patch()
    updateJob(
        @GetUser('_id') jobId:ObjectId,
        @Body() updateJobDto:UpdateJobDto
    ){
        return  this.jobService.updateJob(jobId,updateJobDto)
    }
    @UseGuards(AuthGuard("jwt"))
    @Delete()
    deleteJob(@Query("_id")noteId:ObjectId){
       return this.jobService.deleteJob(noteId)
    }
}



