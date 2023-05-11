import { 
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Req,
    UseGuards
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleCreateDto } from './dto/create-role.dto';
import { RoleUpdateDto } from './dto/update-role.dto';
import { ObjectId } from 'mongoose';

@Controller('role')
export class RoleController {
    constructor( private readonly roleService: RoleService) {}

    @Get()
    async getAll() {
        return this.roleService.getAll()
    }

    @Post()
    async create(@Body() roleCreateDto: RoleCreateDto) {
        return this.roleService.create(roleCreateDto)
    }

    @Patch(':id')
    async update(
        @Param('id') id: any,
        @Body() roleUpdateDto: RoleUpdateDto
    ) {
        return this.roleService.update(id,roleUpdateDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: any) {
        return this.roleService.remove(id)
    }
}
