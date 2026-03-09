import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({ example: "string" })
    @IsString()
    name: string;

    @ApiProperty({ example: "string" })
    @IsString()
    description: string;
}