import { ForbiddenException, HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as argon from 'argon2';
import { Request } from 'express';
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    async getAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async getByEmail(email: string) {
        return this.userModel.findOne({email: email}).exec();
    }

    async getById(id: ObjectId): Promise<User> {
        return this.userModel.findById(id)
    }

    async update(
        id: ObjectId,
        updateUserDto: UpdateUserDto,
        ): Promise<any> {
        return await this.userModel
            .updateOne({_id: id}, updateUserDto)
        
    }
    
    async remove(id: ObjectId): Promise<User> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
