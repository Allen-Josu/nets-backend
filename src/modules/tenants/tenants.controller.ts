import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  Patch
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiParam
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guards';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateTenantsDto } from './dto/create-tenants.dto';
import { UpdateTenantsDto } from './dto/update-tenants.dto';

@ApiTags('Tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new tenant' })
  @ApiBody({ type: CreateTenantsDto })
  async create(
    @Body() dto: CreateTenantsDto,
    @CurrentUser() current_user: any
  ) {
    return await this.tenantsService.create(dto, current_user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tenants' })
  async findAll(@CurrentUser() current_user: any) {
    return await this.tenantsService.findAll(current_user);
  }

  @Get(':entityId')
  @ApiOperation({ summary: 'Get tenant by entityId' })
  @ApiParam({ name: 'entityId', description: 'Tenant Entity ID' })
  async findOne(
    @Param('entityId') entityId: string,
    @CurrentUser() current_user: any
  ) {
    return await this.tenantsService.findOne(entityId, current_user);
  }

  @Patch(':entityId')
  @ApiOperation({ summary: 'Update tenant by entityId' })
  @ApiParam({ name: 'entityId', description: 'Tenant Entity ID' })
  @ApiBody({ type: UpdateTenantsDto })
  async update(
    @Param('entityId') entityId: string,
    @Body() dto: UpdateTenantsDto,
    @CurrentUser() current_user: any
  ) {
    return await this.tenantsService.update(entityId, dto, current_user);
  }

  @Delete(':entityId')
  @ApiOperation({ summary: 'Delete tenant by entityId' })
  @ApiParam({ name: 'entityId', description: 'Tenant Entity ID' })
  async remove(
    @Param('entityId') entityId: string,
    @CurrentUser() current_user: any
  ) {
    return await this.tenantsService.remove(entityId, current_user);
  }
}