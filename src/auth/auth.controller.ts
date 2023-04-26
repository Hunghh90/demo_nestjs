import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { ApiTags } from "@nestjs/swagger";
@Controller("auth")
@ApiTags("Auth")
export class AuthController{
    constructor(private authService:AuthService) {

    }
    
    @Post("login")
    login(@Body() body:AuthLoginDto) {
        return this.authService.login(body);
    }
    
    @Post("register")
    register(@Body() body:AuthDto) {
        return this.authService.register(body);
    }

   
}