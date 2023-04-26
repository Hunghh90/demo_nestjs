import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../auth.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(@InjectModel(User.name) private userModel: Model<User>,){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret
        })
    }
    async validate(payload:{sub:object, email:string}){
        const user = await this.userModel.findById(payload.sub);
        return user;
    }
}