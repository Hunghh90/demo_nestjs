import { 
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
    Req,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    Res,
    Header
} from '@nestjs/common';
import { JobService } from './job.service';
import { 
    JobCreateDto,
    JobUpdateDto
} from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Permission } from 'src/enum/permission.enum';
import { PermissionsGuard } from 'src/guard/permission-guard.guard';
import { Permissions } from 'src/decorator/permission-decorator.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { multerOptions } from 'src/config/multer-config.config';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import { MIMEType } from 'util';



// @UseGuards(AuthGuard('jwt'))
@Controller('job')
export class JobController {
    constructor( private readonly jobService: JobService, private configService: ConfigService) {}

    @Get()
    async getAll() {
        return this.jobService.getAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('user')
    async getUserJob(@Req() req: any) {
        await req.user.populate('jobs')
        return req.user.jobs
    }


    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.jobService.getById(id);
    }
    
    @UseGuards(PermissionsGuard)
    @Permissions(Permission.Create)
    @Post('create')
    async create(
        @Body() createJobDto: JobCreateDto,
        @Req() req: any
        ) {
        const userId = req.user._id
        return this.jobService.create(userId,createJobDto);
    }

    @Get('image/:imgpath')
        seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: this.configService.get<string>('DEST') });
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(
        @UploadedFile() file,
        @Req() req:Request
        ) {
        return this.jobService.uploadFile(file,req);
    }

    @Post('multiple')
    @UseInterceptors(FilesInterceptor('image', 20))
    async uploadMultipleFiles(@UploadedFiles() image) {
        return image;
    }

    // @Get()
    // @Header('Content-Type', 'text/xlsx')
    // async downloadExcel(@Res() res: Response) {
    //     const rs = await this.jobService.downloadExcel();
    //     res.download(`${rs}`);

    // }

    @UseGuards(PermissionsGuard)
    @Permissions(Permission.Create)
    @Patch(':id')
    async update(
        @Param('id') id: any,
        @Body() body: JobUpdateDto
    ) {
        return this.jobService.update(id,body);
    }

    @UseGuards(PermissionsGuard)
    @Permissions(Permission.Delete)
    @Delete(':id')
    async remove( @Param('id') id: any) {
        return this.jobService.remove(id);
    }
}
