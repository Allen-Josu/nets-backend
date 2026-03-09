import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTenantsDto } from './dto/create-tenants.dto';
import { UpdateTenantsDto } from './dto/update-tenants.dto';
import { Tenants } from './schema/tenants.schema';
import { CountersService } from 'src/common/counters/counters.service';
import { on } from 'events';

@Injectable()
export class TenantsService {
    constructor(
        @InjectModel(Tenants.name) private tenantsModel: Model<Tenants>,
        private countersService: CountersService,
    ) { }

    private isSuperAdmin(current_user: any): void {
        if (!current_user?.role?.name) {
            throw new UnauthorizedException('Invalid user role');
        }

        if (current_user.role.name.toLowerCase() !== 'super-admin') {
            throw new UnauthorizedException(
                'You are not authorized to perform this action',
            );
        }
    }

    async create(dto: CreateTenantsDto, current_user: any) {
        try {
            this.isSuperAdmin(current_user);

            const tenantId = await this.countersService.incrementCounter('TENANTS')

            const user = {
                name: current_user?.name,
                entityId: current_user?.entityId
            }

            const tenant = await this.tenantsModel.create({ ...dto, tenantId: tenantId, onboardedBy: user });

            return {
                success: true,
                message: 'Tenant created successfully',
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll(current_user: any) {
        try {
            this.isSuperAdmin(current_user);

            const tenants = await this
                .tenantsModel
                .find()
                .populate([
                    {
                        path: "apps",
                        select: "-_id name entityId",
                        justOne: true,
                        strictPopulate: false
                    }
                ]
                )
                .exec();

            return {
                success: true,
                message: "Tenants fetched Successfully",
                results: tenants,
                totalCount: tenants.length,
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(entityId: string, current_user: any) {
        try {
            this.isSuperAdmin(current_user);

            const tenant = await this
                .tenantsModel
                .findOne({ entityId })
                .populate({
                    path: "apps",
                    select: "-_id name entityId",
                    justOne: true,
                    strictPopulate: false
                })
                .exec();

            if (!tenant) {
                throw new NotFoundException(`Tenant not found`);
            }

            return {
                success: true,
                message: "Tenants fetched Successfully",
                results: tenant,
                totalCount: 1,
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(entityId: string, dto: UpdateTenantsDto, current_user: any) {
        try {
            this.isSuperAdmin(current_user);

            const tenant = await this.tenantsModel.findOneAndUpdate(
                { entityId },
                { $set: dto },
                { new: true },
            );

            if (!tenant) {
                throw new NotFoundException(`Tenant not found`);
            }

            return {
                success: true,
                message: 'Tenant updated successfully',
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async remove(entityId: string, current_user: any) {
        try {
            this.isSuperAdmin(current_user);

            const tenant = await this.tenantsModel.findOneAndDelete({ entityId });

            if (!tenant) {
                throw new NotFoundException(`Tenant not found`);
            }

            return {
                success: true,
                message: 'Tenant deleted successfully',
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}