import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Job, JobSchema } from './job.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Job.name, schema:JobSchema}]),
        JwtModule.register({ global: true,}),
    ],
    controllers:[
        JobController
    ],
    providers:[
        JobService
    ]
})
export class JobModule {}
