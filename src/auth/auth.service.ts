import { BadRequestException, ForbiddenException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import * as argon from 'argon2';

import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
import { User } from "./../user/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateUserDto } from "./../user/dto";



@Injectable({})
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
        ) {}

        async register(createUserDto: CreateUserDto):Promise<any> {
          console.log(createUserDto.email)
            const user = await this.userService.getByEmail(createUserDto.email)
            if(user){
                throw new UnprocessableEntityException("Email is exist")
            }
            if(createUserDto.password != createUserDto.confirmPassword) {
                throw new ForbiddenException("Confirm password is not correct")
            }
            const  hashPassword = await argon.hash(createUserDto.password)
            const createUser = await this.userService.create({
                ...createUserDto,
                password: hashPassword
            });
            const tokens = await this.getTokens(createUser._id, createUser.email);
            await this.updateRefreshToken(createUser._id, tokens.refreshToken);
            return tokens;
        }

        async login(authDto:AuthDto) {
            console.log(authDto.email)
            const user = await this.userService.getByEmail(authDto.email)
            if(!user) throw new BadRequestException('User does not exist')
            const checkPassword = await argon.verify(
                user.password,
                authDto.password,
            )
            if(!checkPassword) throw new BadRequestException('Password is incorrect');
            
            const tokens = await this.getTokens(user._id, user.email);
            await this.updateRefreshToken(user._id, tokens.refreshToken);
            return tokens;
        }

        async logout(id: ObjectId) {
            return this.userService.update(id, { refreshToken: null });
        }

        async getTokens(id: ObjectId, email: string) {
            const [accessToken, refreshToken] = await Promise.all([
              this.jwtService.signAsync(
                {
                  sub: id,
                  email,
                },
                {
                  secret: this.configService.get("JWT_SECRET"),
                  expiresIn: this.configService.get("EXPIRESIN"),
                },
              ),
              this.jwtService.signAsync(
                {
                  sub: id,
                  email,
                },
                {
                  secret: this.configService.get("REFRESH_SECRET"),
                  expiresIn: this.configService.get("REFRESH_EXPIRESIN"),
                },
              ),
            ]);
        
            return {
              accessToken,
              refreshToken,
            };
          }
        
    
        async updateRefreshToken(id: ObjectId, refreshToken: string) {
            const hashedRefreshToken = await argon.hash(refreshToken);
            await this.userService.update(id, {
              refreshToken: hashedRefreshToken,
            });
          }

          async refreshTokens(id: ObjectId, refreshToken: string) {
            const user = await this.userService.getById(id);
            if (!user || !user.refreshToken)
              throw new ForbiddenException('Access Denied');
            const refreshTokenMatches = await argon.verify(
              user.refreshToken,
              refreshToken,
            );
            if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
            const tokens = await this.getTokens(user._id, user.email);
            await this.updateRefreshToken(user._id, tokens.refreshToken);
            return tokens;
          }
    
}

  