import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from '../user/dto';
import { UserService } from '../user/user.service';
import * as argon from 'argon2';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async register(userCreateDto: UserCreateDto) {
        const user = await this.userService.create(userCreateDto)
        const token = await this.createToken(user);
        await this.updateRefreshToken(user,token.refreshToken)
        return {
            email: user.email,
            ...token,
        }
    }

    async login(loginDto: LoginDto) {
        const user = await this.userService.getByEmail(loginDto.email);
        const ckeckPassword = await argon.verify(
            user.password,
            loginDto.password
        )
        if(!ckeckPassword) {
            throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
        const token = await this.createToken(user);
        await this.updateRefreshToken(user,token.refreshToken)
        return {
            email: user.email,
            ...token
        }
    }

    async logout(email: string) {
        return this.userService.update(email, { refreshToken: null });
    }

    async validateUser(email) {
        const user = await this.userService.getByEmail(email);
        if(!user) {
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    private async createToken({email}) {
        const accessToken = await this.jwtService.sign({email});
        const refreshToken = await this.jwtService.sign(
            {email},
            { 
            secret: process.env.REFRESH_SECRET,
            expiresIn: process.env.REFRESH_EXPIRESIN,
            }
        );
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,
            expiresInRefresh: process.env.REFRESH_EXPIRESIN,
            refreshToken,

        }
    }
    async updateRefreshToken({email}, refreshToken: string) {
        const hashedRefreshToken = await argon.hash(refreshToken);
        await this.userService.update(
             email,
            {refreshToken: hashedRefreshToken}
        );
    }
    async refreshToken(email: string, refreshToken: string) {
        const user = await this.userService.getByEmail(email);
        if (!user || !user.refreshToken)
          throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);
        // const refreshTokenMatches = await argon.verify(
        //   user.refreshToken,
        //   refreshToken,

        // );
    //    console.log(refreshToken,refreshTokenMatches)
        // if (!refreshTokenMatches) throw new HttpException('Access Denied2', HttpStatus.FORBIDDEN);
        if(refreshToken !== user.refreshToken)  throw new HttpException('Access Denied2', HttpStatus.FORBIDDEN);
        const tokens = await this.createToken(user);
        await this.updateRefreshToken(user, tokens.refreshToken);
        return tokens;
    }
}
