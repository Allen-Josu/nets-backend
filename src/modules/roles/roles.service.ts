import { Injectable, UnauthorizedException, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schema/role.schema';
import { Model } from 'mongoose';
import { UserWithRole } from '../users/schema/user.schema';

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(Role.name) private roleModel: Model<Role>,
    ) { }

    async create(dto: CreateRoleDto, current_user: UserWithRole) {
        try {

            if (!current_user?.role?.name) {
                throw new UnauthorizedException("Invalid user role");
            }

            if (current_user.role.name.toLowerCase() !== "super-admin") {
                throw new UnauthorizedException(
                    "You are not authorized to create a role"
                );
            }

            const role = await this.roleModel.create(dto);

            return {
                success: true,
                message: "Role created successfully",
            };

        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    async findAll() {
        try {
            const roles = await this.roleModel
                .find()
                .select('-__v -_id')
                .exec();

            return {
                success: true,
                message: 'Roles fetched successfully',
                results: roles,
                totalCount: roles.length,
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(dto, entityId: string, current_user: UserWithRole) {
        try {
            if (!entityId) throw new BadRequestException("entityId is required");

            if (current_user?.role?.name.toLowerCase() !== "super-admin") {
                throw new UnauthorizedException(
                    "You are not authorized to update a role"
                );
            }

            const updatedRole = await this.roleModel.findOneAndUpdate(
                { entityId },
                { $set: dto },
                { new: true }
            );

            if (!updatedRole) {
                throw new NotFoundException("Role not found");
            }

            return {
                success: true,
                message: "Role updated successfully",
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    async delete(entityId: string, current_user: UserWithRole) {
        try {
            if (!entityId) throw new BadRequestException("entityId is required");

            if (current_user?.role?.name.toLowerCase() !== "super-admin") {
                throw new UnauthorizedException(
                    "You are not authorized to delete a role"
                );
            }

            const deletedRole = await this.roleModel.findOneAndDelete({ entityId });

            if (!deletedRole) {
                throw new NotFoundException("Role not found");
            }

            return {
                success: true,
                message: "Role deleted successfully",
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}