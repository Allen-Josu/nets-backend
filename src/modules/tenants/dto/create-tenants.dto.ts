import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsArray,
    ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ContactInfoDto {
    @ApiProperty({
        description: 'Contact person name',
        example: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Contact person mobile number',
        example: '9876543210',
    })
    @IsString()
    @IsNotEmpty()
    mobNo: string;
}

export class CreateTenantsDto {
    @ApiProperty({
        description: 'Name of the tenant organization',
        example: 'ABC Driving School',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Primary mobile number of the tenant',
        example: '9876543210',
    })
    @IsString()
    @IsNotEmpty()
    mobNo: string;

    @ApiProperty({
        description: 'Tenant address',
        example: 'Sector 15, Noida, Uttar Pradesh',
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        description: 'PAN card number of the tenant',
        example: 'ABCDE1234F',
    })
    @IsString()
    @IsNotEmpty()
    panCard: string;

    @ApiProperty({
        description: 'GST number of the tenant',
        example: '22ABCDE1234F1Z5',
    })
    @IsString()
    @IsOptional()
    gstNumber?: string;


    @ApiProperty({
        description: 'Contact information of the tenant',
        type: ContactInfoDto,
    })
    @ValidateNested()
    @Type(() => ContactInfoDto)
    contactInfo: ContactInfoDto;

    @ApiProperty({
        description: 'Number of employees in the tenant',
        example: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    employees?: number;

    @ApiProperty({
        description: 'List of app IDs assigned to the tenant',
        example: [],
        type: [String],
    })
    @IsArray()
    apps_id: string[];

}