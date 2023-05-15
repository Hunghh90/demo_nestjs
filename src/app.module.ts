import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobModule } from './job/job.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ToolModule } from './tool/tool.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';




@Module({
  imports:[
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    
    UserModule,
    JobModule,
    AuthModule,
    JwtModule,
    ConfigModule.forRoot({
			isGlobal: true,
		}),
    MulterModule.register({
      dest: './upload',
      limits: {
        fileSize: 10000000,
    },
    
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          
            if (!existsSync('./upload')) {
                mkdirSync('./upload');
            }
            cb(null, './upload');
        },
        filename: (req: any, file: any, cb: any) => {
          // Calling the callback passing the random name generated with the original extension name
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
      
    }),
    ToolModule,
    RoleModule,
    PermissionModule,
    ConfigModule,
  ],
  providers:[]
 
})
export class AppModule {
 
}
function uuid() {
  throw new Error('Function not implemented.');
}

