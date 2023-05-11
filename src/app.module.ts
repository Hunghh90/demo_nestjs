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
    ToolModule,
    RoleModule,
    PermissionModule,
  ],
  providers:[]
 
})
export class AppModule {
 
}
