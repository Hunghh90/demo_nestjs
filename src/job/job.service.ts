import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './job.schema';
import 
{ 
    JobCreateDto,
    JobUpdateDto
} 
from './dto';
import { User } from 'src/user/user.schema';
import path from 'path';


@Injectable()
export class JobService {
    constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

    async getAll(): Promise<Job[]> {
        return this.jobModel.find().populate({path: 'userId', select: 'userName email'}).exec();
    }

    async getById(id: string){
        const job = await this.jobModel.findById(id)
        if(!job){
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        }
        return job
    }

    async create(userId: any, createJobDto: JobCreateDto) {
        const checkJob = await this.jobModel.findOne({title: createJobDto.title})
        if(checkJob) throw new HttpException("Job is exists", HttpStatus.BAD_REQUEST);
        const job = await new this.jobModel({
            ...createJobDto,
            userId,
        })
        return (await job.save()).populate({path: 'userId', select: 'userName email'})
    }

    async update(id:string, body: JobUpdateDto){}

    async remove(id: string){}
}
