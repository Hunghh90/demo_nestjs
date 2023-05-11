import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionCreateDto } from './dto/create-permission.dto';
import { PermissionUpdateDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) {}

    @Get()
    async get() {
        return this.permissionService.getAll();
    };

    @Post()
    async create(@Body() permissionCreateDto: PermissionCreateDto) {
        return this.permissionService.create(permissionCreateDto);
    };

    @Patch(':id')
    async update(@Param('id') id: any, @Body() permissionUpdateDto: PermissionUpdateDto) {
        return this.permissionService.update(id, permissionUpdateDto);
    };

    @Delete(':id')
    async remove(@Param('id') id: any) {
        return this.permissionService.remove(id);
    };
}
