import { 
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
    Req
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


@UseGuards(AuthGuard('jwt'))
@Controller('job')
export class JobController {
    constructor( private readonly jobService: JobService) {}

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
    @Permissions(Permission.Create)
    @Delete(':id')
    async remove( @Param('id') id: any) {
        return this.jobService.remove(id);
    }
}
