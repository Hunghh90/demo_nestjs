import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './permission.schema';
import { Model } from 'mongoose';
import { PermissionCreateDto } from './dto/create-permission.dto';
import { PermissionUpdateDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
    constructor(@InjectModel(Permission.name) private permissionModel: Model<Permission>) {}

    async getAll() {
        return this.permissionModel.find();
    };

    async getByName(name: string) {
        return this.permissionModel.findOne({name: name});
    };

    async create(permissionCreateDto: PermissionCreateDto) {
        const permission = await this.permissionModel.findOne({name: permissionCreateDto.name});
        if(permission) throw new HttpException("Permission is exists", HttpStatus.BAD_REQUEST);
        const permissionCreat = await new this.permissionModel(permissionCreateDto);
        return permissionCreat.save()
    };

    async update(id: any, permissionUpdateDto: PermissionUpdateDto) {
       try{
        const permission = await this.permissionModel.findById(id);
        if(!permission) throw new HttpException("Permission isn't exists", HttpStatus.BAD_REQUEST);
        const permissionUpdate = await this.permissionModel.findByIdAndUpdate(id, permissionUpdateDto, {new: true});
        return permissionUpdate;
       }catch(e) {
        throw new HttpException("Permission isn't exists", HttpStatus.BAD_REQUEST);
       }
    };

    async remove(id: any) {
        try{
         const permission = await this.permissionModel.findById(id);
         if(!permission) throw new HttpException("Permission isn't exists", HttpStatus.BAD_REQUEST);
         const permissionDelete = await this.permissionModel.findByIdAndDelete(id);
         return permissionDelete;
        }catch(e) {
         throw new HttpException("Permission isn't exists", HttpStatus.BAD_REQUEST);
        }
     };
}
