import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './role.dto';

export class UpdateRoleDTO extends PartialType(CreateRoleDto) { }
