import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { Job, JobSchema } from './job.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerOptions } from 'src/config/multer-config.config';

@Module({
  imports:[MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
  MulterModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      dest: configService.get<string>('DEST'),
      limits: {fileSize: configService.get('MAX_FILE_SIZE')},
      storage: diskStorage({
            destination: (req: any, file: any, cb: any) => {
                if (!existsSync(configService.get<string>('DEST'))) {
                    mkdirSync(configService.get<string>('DEST'));
                }
                cb(null, configService.get<string>('DEST'));
            },
            filename: multerOptions.editFileName
      }),
      fileFilter: multerOptions.fileFilter 
    }),
    inject: [ConfigService],
  }),
],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {
}

