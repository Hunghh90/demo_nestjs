import { 
Controller,
Get,
UseGuards,
Req,
Patch,
Post,
Param,
Delete,
Body
 } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '././dto'
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { User } from './user.schema';
import { ObjectId } from 'mongoose';
import { AccessTokenGuard } from 'src/common/guards';

@Controller('user')
@ApiTags("User")

export class UserController {
    constructor(
        private userService: UserService
    ) {}
    @Get('getAll')
    async getAll(){
        const obj = await this.userService.getAll()
        return obj
    }

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

    @Get('getByEmail')
    async getByEmail(@Body() request:any) {
        const obj = await this.userService.getByEmail(request);
        return obj
    }

    @Get('getById/:id')
    async getById(@Param('id') id: ObjectId) {
        const obj = await this.userService.getById(id);
        return obj
    }
    @UseGuards(AccessTokenGuard)
    @Patch('update/:id')
    async update(@Param('id') id: ObjectId, @Body() updateUserDto: UpdateUserDto) {
        const obj = await this.userService.update(id, updateUserDto);
        return obj
    }
    @UseGuards(AccessTokenGuard)
    @Delete('delete/:id')
    async remove(@Param('id') id: ObjectId) {
        const obj = await this.userService.remove(id);
        return obj
    }
   
}
