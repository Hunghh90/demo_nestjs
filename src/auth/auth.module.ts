import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy, RefreshTokenStrategy  } from "./strategy";
import { UserModule } from "src/user/user.module";

@Module({
    imports:[ 
        JwtModule.register({ global: true, }),
        UserModule
     
    ],
    controllers:[
        AuthController
    ],
    providers:[
        AuthService,
        JwtStrategy,
        RefreshTokenStrategy 
    ]
})
export class AuthModule {}