import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Permission } from "../../permission/permission.schema";

export class RoleUpdateDto {

    @ApiProperty()
    @IsNotEmpty()
    name?: string

    @ApiProperty()
    @IsNotEmpty()
    description?: string

    @ApiProperty()
    status?: number

}