import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guards";
import { UpdateUserDTO } from "./dto/update-user.dto";

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDTO })
  async create(@Body() dto: CreateUserDTO) {
    return await this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users or a user by entityId' })
  @ApiQuery({ name: 'entityId', required: false, description: 'Optional entityId to filter' })
  async find(@Query('entityId') entityId?: string) {
    if (entityId) return await this.usersService.findByEntity(entityId);
    return await this.usersService.findAll();
  }

  @Patch(':entityId')
  @ApiOperation({ summary: 'Update a user by entityId' })
  @ApiParam({ name: 'entityId', required: true, description: 'User entityId' })
  @ApiBody({ type: UpdateUserDTO })
  async update(@Param('entityId') entityId: string, @Body() dto: UpdateUserDTO) {
    return await this.usersService.update(entityId, dto);
  }

  @Delete(':entityId')
  @ApiOperation({ summary: 'Delete a user by entityId' })
  @ApiParam({ name: 'entityId', required: true, description: 'User entityId' })
  async remove(@Param('entityId') entityId: string) {
    return await this.usersService.remove(entityId);
  }
}