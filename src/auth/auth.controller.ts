import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/user/dto";
import { Request } from "express";
import { AccessTokenGuard, RefreshTokenGuard } from "./../common/guards";
@Controller("auth")
@ApiTags("Auth")
export class AuthController {
    constructor(private authService:AuthService) {

    }
    
    @Post("login")
    async login(@Body() body:AuthDto) {
        const obj = await this.authService.login(body);
        return obj;
    }
    
    @Post("register")
    async register(@Body() body:CreateUserDto) {
        const obj = await this.authService.register(body);
        return obj;
    }
   @UseGuards(AccessTokenGuard)
    @Get('logout')
    async logout(@Req() req: Request) {
        console.log(req.user)
        this.authService.logout(req.user['sub']);
    }
    
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refreshTokens(@Req() req: Request) {
        const _id = req.user['sub'];
        console.log(req.user)
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(_id, refreshToken);
    }

   
}