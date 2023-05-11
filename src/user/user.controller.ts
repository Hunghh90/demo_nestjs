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
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor( private readonly userService: UserService){}
    
    @Get()
    async getAll(){
        return this.userService.getAll()
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async profile(@Req() req: any) {
        return await req.user
    }

    @Get(':id')
    async getById(@Param('id') id: string){
        return this.userService.getById(id)
    }

    @Post()
    async create(@Body() createUserDto: UserCreateDto) {
        return this.userService.create(createUserDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch()
    async update(@Req() req: any, @Body() userUpdateDto: UserUpdateDto) {
        const email = req.user.email
        return this.userService.update(email,userUpdateDto);
    }

}
