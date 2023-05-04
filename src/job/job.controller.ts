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
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { User } from './../user/user.schema';
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
        @GetUser('_id') user:User,
        @Body() insertJobDto:InsertJobDto
    ) {
        const data = await this.jobService.createJob(user,insertJobDto)
        return data
    }
   
    
    @Patch('update/:id')
    async updateJob(
        @GetUser('_id') user:User,
        @Param('id') jobId:ObjectId,
        @Body() updateJobDto:UpdateJobDto
    ) {
        const data = await  this.jobService.updateJob(user,jobId,updateJobDto)
        return data
    }
    
    
    @Delete('delete/:id')
    async deleteJob(
        @GetUser() user:User,
        @Param("id")jobId:ObjectId) {
        const data = await this.jobService.deleteJob(user,jobId)
        return data
    }
}



