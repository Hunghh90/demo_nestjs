import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from './../../user/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthDto } from '../dto';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {
       
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            passReqToCallback: true,
        });
    }
    
    async validate(req: Request, payload:AuthDto) {
      
    const user = await this.userService.getByEmail(payload.email);
    if(user ==null) {
        throw new ForbiddenException("404 Not Found")
    }
    return payload;
    }
}