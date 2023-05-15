import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserCreateDto, UserUpdateDto } from './dto';
import * as argon from 'argon2';
@Injectable()
export class UserService {
    constructor( @InjectModel(User.name) private userModel : Model<User>){}

    async getAll(): Promise<User[]> {
        return this.userModel.find();
        
    }

    async getById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if(!user) {
            throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async getByEmail(email: string) {
        const user = await this.userModel.findOne({email: email});
        if(!user) {
            throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async create(createUserDto: UserCreateDto): Promise<User> {
        const user = await this.userModel.findOne({email:createUserDto.email});
        if(user) {
            throw new HttpException("Email is already", HttpStatus.BAD_REQUEST);
        }
         
        if(createUserDto.password !== createUserDto.confirmPassword) {
            throw new HttpException("Confirm password is not correct", HttpStatus.BAD_REQUEST);
        }
         const hashPassword = await argon.hash(createUserDto.password) ;
        const createUser = await new this.userModel({
            ...createUserDto,
            password: hashPassword
        });
        return createUser.save();
    }

    async update(
        email: any,
        userUpdateDto: UserUpdateDto,
    ) {
        if(userUpdateDto.roles || userUpdateDto.permissions || userUpdateDto.userName) {
            return await this.userModel.findOneAndUpdate({email:email}, userUpdateDto, {new: true});
        }
        if(userUpdateDto.password) {
            const checkUser = await this.userModel.findOne({email: email});
            const ckeckPassword = await argon.verify(
                checkUser.password,
                userUpdateDto.oldPassword
            )
            if(!ckeckPassword) {
                throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);
            }
            if(userUpdateDto.password !== userUpdateDto.confirmPassword) {
                throw new HttpException("Confirm password is not correct", HttpStatus.BAD_REQUEST);
            }
            const hashPassword = await argon.hash(userUpdateDto.password) ;
            return await this.userModel.findOneAndUpdate({email:email}, {...userUpdateDto, password: hashPassword}, {new: true});
        }
        await this.userModel.updateOne({email:email}, userUpdateDto,)
        return {
        statuscode:200
        }
    }

    async remove() {}
}
