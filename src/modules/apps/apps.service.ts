// apps.service.ts
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAppsDto } from './dto/create-apps.dto';
import { Model } from 'mongoose';
import { Apps } from './schema/apps.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateAppsDto } from './dto/update-apps.dto';

@Injectable()
export class AppsService {

    constructor(
        @InjectModel(Apps.name) private appsModel: Model<Apps>,
    ) { }

    private isSuperAdmin(current_user: any): void {
        if (!current_user?.role?.name) {
            throw new UnauthorizedException("Invalid user role");
        }
        if (current_user.role.name.toLowerCase() !== "super-admin") {
            throw new UnauthorizedException("You are not authorized to perform this action");
        }
    }

    async create(dto: CreateAppsDto, current_user: any) {
        try {
            this.isSuperAdmin(current_user);

            await this.appsModel.create(dto);

            return {
                success: true,
                message: "App created successfully",
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll(current_user: any) {
        try {
            this.isSuperAdmin(current_user);

            const apps = await this.appsModel.find().exec();

            return {
                success: true,
                results: apps,
                totalCount: apps.length,
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(entityId: string, current_user: any) {
        try {
            this.isSuperAdmin(current_user);

            const app = await this.appsModel.findOne({ entityId });

            if (!app) {
                throw new NotFoundException(`App not found`);
            }

            return {
                success: true,
                results: app,
                totalCount: 1,
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(entityId: string, dto: UpdateAppsDto, current_user: any) {
        try {
            this.isSuperAdmin(current_user);

            const app = await this.appsModel.findOneAndUpdate(
                { entityId },
                { $set: dto },
                { new: true } // return the updated document
            );

            if (!app) {
                throw new NotFoundException(`App with ID ${entityId} not found`);
            }

            return {
                success: true,
                message: "App updated successfully",
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async remove(entityId: string, current_user: any) {
        try {
            this.isSuperAdmin(current_user);

            const app = await this.appsModel.findOneAndDelete({ entityId });

            if (!app) {
                throw new NotFoundException(`App not found`);
            }

            return {
                success: true,
                message: "App deleted successfully",
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}