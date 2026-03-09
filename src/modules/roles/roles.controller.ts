import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guards';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/role.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateRoleDTO } from './dto/update-role.dto';

@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiBody({ type: CreateRoleDto })
  async create(@Body() dto: CreateRoleDto, @CurrentUser() current_user: any) {
    return await this.rolesService.create(dto, current_user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Patch(":entityId")
  @ApiOperation({ summary: 'Update a role' })
  async update(@Query("entityId") entityId: string, @Body() dto: UpdateRoleDTO, @CurrentUser() current_user: any) {
    return await this.rolesService.update(dto, entityId, current_user);
  }

  @Delete(":entityId")
  @ApiOperation({ summary: 'Delete a role' })
  async delete(@Query("entityId") entityId: string, @CurrentUser() current_user: any) {
    return await this.rolesService.delete(entityId, current_user);
  }
}
