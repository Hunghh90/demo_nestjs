import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/enum/permission.enum';


export const Permissions = (...permissions: Permission[]) => SetMetadata('permissions', permissions);