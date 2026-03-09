import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppsDto {
  @ApiProperty({
    description: 'Name of the application',
    example: 'HR Management',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Short description of the application',
    example: 'Application for managing employee data',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'URL or path of the application icon',
    example: '/assets/icons/hr.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  icon?: string;
}