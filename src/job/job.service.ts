import { ForbiddenException, Injectable } from '@nestjs/common';
import { InsertJobDto, UpdateJobDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './job.schema';
import { Model, ObjectId, now } from 'mongoose';
import { User } from './../auth/auth.schema';
import { title } from 'process';

@Injectable()
export class JobService {
    constructor(
        @InjectModel(Job.name) private jobModel: Model<Job>,
        @InjectModel(Job.name) private userModel: Model<User>
    ){}

    async getJob(userId:ObjectId) {
        const job = await this.jobModel.find({userId:userId})
        if(job == null){
            throw new ForbiddenException("404 Not Found")
        }
        return job
    }
    

    async getJobById(jobId:object) {
        const job = await this.jobModel.findById(jobId)
        if(job == null){
            throw new ForbiddenException("404 Not Found")
        }
        return job
    }

    async createJob(
        userId:ObjectId,
        insertJobDto:InsertJobDto
    ) {
        const jobCreate = await new this.jobModel({
            ...insertJobDto,
            userId,
            createdAt:now()
        })
        
        return jobCreate.save()
    }

    async updateJob(
        userId:ObjectId,
        jobId:ObjectId,
        updateJobDto:UpdateJobDto
    ) {
        const job = await this.jobModel.findById(jobId)
        const newObjectId= userId.toString()
        if(newObjectId !== job.userId) {
            throw new ForbiddenException("Incorrect information")
        }
        const jobUpdate = await this.jobModel.findByIdAndUpdate(jobId, {
            ...updateJobDto,
            updatedAt:now()
        })
        return "Done"
    }

    async deleteJob(
        userId:ObjectId,
        jobId:ObjectId
        ) {
        const job = await this.jobModel.findById(jobId)
        const newObjectId= userId.toString()
        if(newObjectId !== job.userId) {
            throw new ForbiddenException("Incorrect information")
        }
        await this.jobModel.findByIdAndDelete(jobId)
        return "Done"
    }
}
