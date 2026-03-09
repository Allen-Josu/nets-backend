import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {

  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 'Test-001',
  })
  @IsString()
  entityId: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account (min 6 characters)',
    example: 'strongpassword123',
  })
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Entity type for the user',
    example: 'users',
  })
  @IsString()
  entity: string;
}