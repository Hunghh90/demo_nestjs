import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import * as argon from 'argon2';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./auth.schema";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { jwtConstants } from "./constants";


@Injectable({})
export class AuthService{
    constructor(
        
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService:JwtService,
        // private configService:ConfigService
        ) {}

    async register(authDto:AuthDto):Promise<User>{

        const user = await this.userModel.findOne({email:authDto.email})
        if(user){
            throw new ForbiddenException("Email is exist")
        }
        if(authDto.password != authDto.confirmPassword){
            throw new ForbiddenException("Confirm password is not correct")
        }
          const  hashPassword = await argon.hash(authDto.password)
          const createUser = new this.userModel({
            email:authDto.email,
            password:hashPassword
          });
          return createUser.save();
    }

        async login(authLoginDto:AuthLoginDto){
            const user = await this.userModel.findOne({email:authLoginDto.email})
            if(!user){
                throw new ForbiddenException("User not found")
            }
            const checkPassword = await argon.verify(
                user.password,
                authLoginDto.password,
            )
            if(!checkPassword){
                throw new ForbiddenException("Incorrect password")
            }
            // return "login"
            return await this.convertToJwtString(user._id,user.email)
        }

        async convertToJwtString(userId:object, email:string):Promise<{accessToken:string}>{
            const payload = {
                sub:userId,
                email
            }
            const jwtString =await this.jwtService.signAsync(payload,{
                expiresIn:"10m",
                secret: jwtConstants.secret
            })
            return {
                accessToken : jwtString
            }
        }
    
    
}

  