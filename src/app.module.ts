import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Console } from 'console';

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
    
  ]
 
})
export class AppModule {}
