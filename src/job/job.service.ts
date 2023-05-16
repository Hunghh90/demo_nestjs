import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './job.schema';
import * as tmp from 'tmp';
import 
{ 
    JobCreateDto,
    JobUpdateDto
} 
from './dto';
import { Workbook } from 'exceljs';
import { Request, Response } from 'express';
import { File } from 'buffer';
import readXlsxFile from 'read-excel-file/node';
import { Console } from 'console';



@Injectable()
export class JobService {
    constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

    async getAll(): Promise<Job[]> {
        return this.jobModel.find().populate({path: 'userId', select: 'email'});
    }

    async getById(id: string) {
        const job = await this.jobModel.findById(id);
        if(!job) {
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
        }
        return job
    }

    async create(userId: any, createJobDto: JobCreateDto) {
        const checkJob = await this.jobModel.findOne({title: createJobDto.title});
        if(checkJob) throw new HttpException("Job is exists", HttpStatus.BAD_REQUEST);
        const job = await new this.jobModel({
            ...createJobDto,
            userId,
        })
        return (await job.save()).populate({path: 'userId', select: 'userName email'})
    }

    async update(id: any, jobUpdateDto: JobUpdateDto) {
        try{
            const checkJob = await this.jobModel.findById(id);
        if(!checkJob) throw new HttpException("Job isn't exists", HttpStatus.BAD_REQUEST);
        const job = await this.jobModel.findByIdAndUpdate(id, jobUpdateDto, {new: true});
        return job;
        }catch(e) {
            throw new HttpException("Job isn't exists", HttpStatus.BAD_REQUEST)
        }
    }

    async remove(id: any) {
        try{
            const checkJob = await this.jobModel.findById(id);
        if(!checkJob) throw new HttpException("Job isn't exists", HttpStatus.BAD_REQUEST);
        const job = await this.jobModel.findByIdAndDelete(id);
        return job;
        }catch(e) {
            throw new HttpException("Job isn't exists", HttpStatus.BAD_REQUEST)
        }
    }

    // async downloadExcel() {
    //     const job = await this.jobModel.find();
    //     if(!job) throw new HttpException('Not data to download', HttpStatus.NOT_FOUND);
    //     const rows = [];
    //     job.forEach(doc=> {
    //         rows.push(Object.values(doc));
    //     })
    //     const workBook = new Workbook;
    //     const workSheet = workBook.addWorksheet('Sheet1');
    //     rows.unshift(Object.keys(job[0]));
    //     workSheet.addRow(rows);
    //     const File = await new Promise((resolve, rejects)=> {
    //         tmp.file({discardDescriptor: true, prefix: 'MyExcelSheet', postfix: '.xlsx', mode: parseInt('0600', 8)},
    //         async (err,file)=> {
    //             console.log(file)
    //             if(err) throw new BadRequestException(err);
    //             workBook.xlsx.writeFile(file)
    //             .then(_ =>{
    //                 resolve(file)
    //             }).catch(err=> {throw new BadRequestException(err)});
    //         });
    //     })
    //     return File;
    // }

    async uploadFile(file) {
        try{
            readXlsxFile(file.path).then((rows)=> {
                rows.shift();
                const jobs= [];
                console.log(rows)
                Array.from(new Set(rows))
                console.log(Array.from(new Set(rows)))
                rows.forEach(async (row)=>{
                    const job = {
                        title: row[0],
                        description: row[1],
                    };
                    // const excelJob = await new this.jobModel(job);
                    // await excelJob.save().then(rs=>{
                    //     return {
                    //         statuscode:200,
                    //         message: "Uploaded the file successfully: " + file.originalname, 
                    //     }
                    // }).catch(e=>{
                    //     throw new HttpException("Could not upload the file"+ file.originalname , HttpStatus.BAD_REQUEST)
                    // })
                });
            })
        } catch (error) {
            throw new HttpException("Could not upload the file", HttpStatus.BAD_REQUEST)
        }
    }
}
