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
@Controller('job')
export class JobController{
    constructor(private jobService:JobService){}
    @ApiTags("Job")
    @UseGuards(AuthGuard("jwt"))
    @Get('getJob')
    getJob(@GetUser("_id") user:ObjectId){
        return this.jobService.getJob(user)
    }
    @ApiTags("Job")
    @UseGuards(AuthGuard("jwt"))
    @Get(":id")
    getJobById(@Param('_id') jobId:ObjectId){
        return this.jobService.getJobById(jobId)
    }
    @ApiTags("Job")
    @UseGuards(AuthGuard("jwt"))
    @Post('create')
    createJob(
        @GetUser("_id") userId:ObjectId,
        @Body() insertJobDto:InsertJobDto
    ){
        return this.jobService.createJob(userId,insertJobDto)
    }
    @ApiTags("Job")
    @UseGuards(AuthGuard("jwt"))
    @Patch('update')
    updateJob(
        @Param('_id') jobId:ObjectId,
        @Body() updateJobDto:UpdateJobDto
    ){
        return  this.jobService.updateJob(jobId,updateJobDto)
    }
    @ApiTags("Job")
    @UseGuards(AuthGuard("jwt"))
    @Delete('delete')
    deleteJob(@Query("_id")noteId:ObjectId){
       return this.jobService.deleteJob(noteId)
    }
}



