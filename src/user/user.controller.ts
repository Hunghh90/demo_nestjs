import { 
Controller,
Get,
UseGuards,
Req
 } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { request } from 'http';
import { User } from 'src/auth/auth.schema';
import { GetUser } from 'src/auth/decorator';

@Controller('user')
export class UserController {
    @ApiTags("User")
    @UseGuards(AuthGuard("jwt"))
    @Get('me')
    async me(@GetUser() user:User){
       
        return user._id
    }
}
