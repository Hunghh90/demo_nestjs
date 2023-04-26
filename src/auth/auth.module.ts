import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User, UserSchema } from "./auth.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
@Module({
    imports:[ 
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
    JwtModule.register({ global: true,}),
    ],
   controllers:[AuthController],
   providers:[
    AuthService,
    JwtStrategy
]
})
export class AuthModule{

}