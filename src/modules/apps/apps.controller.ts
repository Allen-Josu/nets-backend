import { Body, Controller, Post, Get, Delete, Param, UseGuards, Patch } from '@nestjs/common';
import { AppsService } from './apps.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guards';
import { CreateAppsDto } from './dto/create-apps.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateAppsDto } from './dto/update-apps.dto';

@ApiTags('Apps')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new app' })
  @ApiBody({ type: CreateAppsDto })
  async create(@Body() dto: CreateAppsDto, @CurrentUser() current_user: any) {
    return await this.appsService.create(dto, current_user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all apps' })
  async findAll(@CurrentUser() current_user: any) {
    return await this.appsService.findAll(current_user);
  }

  @Get(':entityId')
  @ApiOperation({ summary: 'Get app by ID' })
  @ApiParam({ name: 'entityId', description: 'App ID' })
  async findOne(@Param('entityId') entityId: string, @CurrentUser() current_user: any) {
    return await this.appsService.findOne(entityId, current_user);
  }

  @Patch(':entityId')
  @ApiOperation({ summary: 'Update app by ID' })
  @ApiParam({ name: 'entityId', description: 'App ID' })
  @ApiBody({ type: UpdateAppsDto })
  async update(
    @Param('entityId') entityId: string,
    @Body() dto: UpdateAppsDto,
    @CurrentUser() current_user: any
  ) {
    return await this.appsService.update(entityId, dto, current_user);
  }

  @Delete(':entityId')
  @ApiOperation({ summary: 'Delete app by ID' })
  @ApiParam({ name: 'entityId', description: 'App ID' })
  async remove(@Param('entityId') entityId: string, @CurrentUser() current_user: any) {
    return await this.appsService.remove(entityId, current_user);
  }
}