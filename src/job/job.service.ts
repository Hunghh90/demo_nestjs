import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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

import { Request, Response } from 'express';

import readXlsxFile from 'read-excel-file/node';





@Injectable()
export class JobService {
    constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

    async getAll(): Promise<Job[]> {
        const abc = await this.jobModel.find().populate({path: 'userId', select: 'email'});
        console.log(abc)
        return abc
        
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

    async uploadFile(file: Express.Multer.File, req:Request) {
        if(file.mimetype.match('docx|doc|xlsx|xls')){
            try{
                const schema = {
                    title: {
                        type: String,
                        prop: 'title'
                    },
                    description: {
                        type: String,
                        prop: 'description'
                    }
                }
                const { rows } = await readXlsxFile(file.path, {
                    schema,                 
                    transformData(rows) {
                      const rowsData = rows.slice(1);
                      const data = [
                        [
                          'title',
                          'description',
                        ],
                        ...rowsData,
                      ];
                      return data;
                    },
                });
                
                const add = [];
                const duplicate = [];
                const alreadyExists = [];
                const deduplicate = [];
                for(let i = 0;i<rows.length;i++){
                    if (!this.isExist(deduplicate, rows[i]['title'])) {
                        deduplicate.push(rows[i]);
                        const checktitle  = await this.jobModel.findOne({title: rows[i]['title']})
                        if(await !checktitle) {                                              
                            const jobs = await new this.jobModel(rows[i]);
                            await jobs.save()
                            add.push(rows[i]);  
                        } else {
                            alreadyExists.push(rows[i]);
                        }
                    } else {
                        console.log(rows[i])
                        duplicate.push(rows[i]);
                    }
                }
                return [add,duplicate,alreadyExists]
            } catch (error) {
                throw new HttpException("Could not upload the file", HttpStatus.BAD_REQUEST)
            }
        }else{
            return file
        }
    }
    isExist = (arr, x) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]['title'] === x) return true;
        }
        return false;
    };
}
