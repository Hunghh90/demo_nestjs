import { Injectable } from '@nestjs/common';
import { InsertJobDto, UpdateJobDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './job.schema';
import { Model, ObjectId, now } from 'mongoose';
import { User } from './../auth/auth.schema';
import { title } from 'process';

@Injectable()
export class JobService {
    constructor( @InjectModel(Job.name) private jobModel: Model<Job>,
    @InjectModel(Job.name) private userModel: Model<User>
    ){}

    async getJob(user:ObjectId){
        const job = await this.jobModel.find({userId:user})
       
        return job
    }
    

    getJobById( jobId:object){}

    async createJob(
        userId:ObjectId,
        insertJobDto:InsertJobDto
    ){
        
        const jobCreate = await new this.jobModel({
           
            ...insertJobDto,
            userId,
            createdAt:now()
           
    
           
        })
        
        return jobCreate.save()
    }

    updateJob(
        jobId:object,
        updateJobDto:UpdateJobDto
    ){}

    deleteJob(noteId:object){}
}
