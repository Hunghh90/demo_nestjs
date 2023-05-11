import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Role } from "../../role/role.schema";

export class PermissionUpdateDto {

    @ApiProperty()
    @IsNotEmpty()
    name?: string

    @ApiProperty()
    description?: string

    @ApiProperty()
    status?: number

}

    
