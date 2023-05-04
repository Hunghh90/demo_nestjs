import { ForbiddenException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InsertJobDto, UpdateJobDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './job.schema';
import { Model, ObjectId, now } from 'mongoose';
import { User } from './../user/user.schema';



@Injectable()
export class JobService {
    constructor(
        @InjectModel( Job.name ) private jobModel: Model<Job>,
        @InjectModel( Job.name ) private userModel: Model<User>
    ){}

    async getJob(userId:ObjectId) {
        try {
            const job = await this.jobModel.find({ userId:userId })
            if( job.length == 0 ) {
                throw new HttpException( "Not Found", HttpStatus.NOT_FOUND )
            }
            return job
        } catch {
            throw new HttpException( "Not Found", HttpStatus.NOT_FOUND )
        }
      
    }
    

    async getJobById(jobId:object) {
        try{
            const job = await this.jobModel.findById(jobId.toString)
            console.log(job)
            if( job == null ) {
                throw new HttpException( "Not Found", HttpStatus.NOT_FOUND )
            }
            return job
        }catch{
            throw new HttpException( "Not Found", HttpStatus.NOT_FOUND )
        }
       
    }

    async createJob(
        userId:User,
        insertJobDto:InsertJobDto
    ) {
        try {
            const jobCreate = await new this.jobModel({
                ...insertJobDto,
                userId,
                createdAt:now()
            })
            return jobCreate.save()
        } catch {
            throw new HttpException('message', HttpStatus.BAD_REQUEST)
        }

        
       
    }

    async updateJob(
        user: User,
        jobId: ObjectId,
        updateJobDto: UpdateJobDto
    ) {
        
        const job = await this.jobModel.findById(jobId)
        if(user._id.toString() !== job.userId.toString()) {
            throw new ForbiddenException("Incorrect information")
        }
        const jobUpdate = await this.jobModel.findByIdAndUpdate(jobId, {
            ...updateJobDto,
            updatedAt: now()
        })
        return "Done"
    }

    async deleteJob(
        user: User,
        jobId: ObjectId
        ) {
        const job = await this.jobModel.findById(jobId)
  
        if(user._id.toString() !== job.userId.toString())  {
            throw new ForbiddenException("Incorrect information")
        }
        await this.jobModel.findByIdAndDelete(jobId)
        return "Done"
    }
}
