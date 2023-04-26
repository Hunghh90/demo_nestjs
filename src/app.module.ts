import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
    UserModule,
    JobModule,
    AuthModule,
    JwtModule
  ]
 
})
export class AppModule {}
