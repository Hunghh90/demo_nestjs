import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { ApiTags } from "@nestjs/swagger";
@Controller("auth")
export class AuthController{
    constructor(private authService:AuthService){

    }
    @ApiTags("Auth")
    @Post("login")
    login(@Body() body:AuthLoginDto){
    
        return this.authService.login(body);
    }
    @ApiTags("Auth")
    @Post("register")
    register(@Body() body:AuthDto){
        return this.authService.register(body);
    }

   
}