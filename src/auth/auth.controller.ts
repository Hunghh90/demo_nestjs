import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from 'src/user/dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenGuard } from './refresh-guard.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() userCreateDto: UserCreateDto) {
        return await this.authService.register(userCreateDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('refresh')
    async refreshTokens(@Req() req: any) {
        const email = req.user.email;
        const refreshToken = req.user.refreshToken;
        return this.authService.refreshToken(email, refreshToken);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('logout')
    async logout(@Req() req: any) { 
        this.authService.logout(req.user.email);
        return "200"
    }
    
}
