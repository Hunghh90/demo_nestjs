import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './role.schema';
import { Model, ObjectId } from 'mongoose';
import { RoleCreateDto } from './dto/create-role.dto';
import { RoleUpdateDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role.name) private roleModel: Model<Role> ) {};

    async getAll() {
        return this.roleModel.find();
    }

    async getByName(name: string) {
        const role = await this.roleModel.findOne({name: name});
        return role;
    }

    async create(roleCreateDto: RoleCreateDto) {
        const name = await this.roleModel.findOne({name: roleCreateDto.name});
        if(name) throw new HttpException("Role is exists", HttpStatus.FORBIDDEN);
        const role = await new this.roleModel(roleCreateDto);
        return role.save();
    }

    async update(id: any, roleUpdateDto: RoleUpdateDto): Promise<Role> {
        try{
            const role = await this.roleModel.findById(id);
            if(!role) throw new HttpException("Role isn't exists", HttpStatus.FORBIDDEN);
            const roleUpdate = await this.roleModel.findByIdAndUpdate(id, roleUpdateDto, {new: true});
            return roleUpdate;
        }catch(e) {
            throw new HttpException("Role isn't exists", HttpStatus.FORBIDDEN);
        }
        
    }

    async remove(id: string) {
        try{
            const role = await this.roleModel.findById(id);
            if(!role) throw new HttpException("Role isn't exists", HttpStatus.FORBIDDEN);
            const roleRemove = await this.roleModel.findByIdAndDelete(id);
            return {
                statuscode: 200,
                roleRemove,
            }
        }catch(e) {
            throw new HttpException("Role isn't exists", HttpStatus.FORBIDDEN);
        }
       
    }
}
