import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './schema/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  // Create a new user
  async create(dto: CreateUserDTO) {
    try {
      const existingUser = await this.userModel.findOne({ email: dto.email });
      if (existingUser) throw new ConflictException('Email already exists');

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      await this.userModel.create({
        ...dto,
        password: hashedPassword,
      });

      return {
        success: true,
        message: 'User created successfully',

      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  // Get all users
  async findAll() {
    const users = await this.userModel
      .find()
      .select('-password')
      .populate({
        path: 'role',
        select: '-_id name entityId',
        justOne: true,
        strictPopulate: false,
      })
      .exec();

    return {
      success: true,
      results: users,
      totalCount: users.length,
    };
  }

  // Get a single user by entityId
  async findByEntity(entityId: string) {
    if (!entityId) throw new BadRequestException('entityId is required');

    const user = await this.userModel
      .findOne({ entityId })
      .select('-password')
      .populate({
        path: 'role',
        select: '-_id name entityId',
        justOne: true,
        strictPopulate: false,
      })
      .exec();

    if (!user) throw new NotFoundException('User not found');

    return {
      success: true,
      results: [user],
      totalCount: 1,
    };
  }

  async findByEmail(email: string) {
    if (!email) throw new BadRequestException('email is required');

    const user = await this.userModel.findOne({ email });
    return user;
  }

  async update(entityId: string, dto: UpdateUserDTO) {
    if (!entityId) throw new BadRequestException('entityId is required');

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    const user = await this.userModel.findOneAndUpdate(
      { entityId },
      { $set: dto },
      { new: true }
    );

    if (!user) throw new NotFoundException('User not found');

    return {
      success: true,
      message: 'User updated successfully',
    };
  }

  async remove(entityId: string) {
    if (!entityId) throw new BadRequestException('entityId is required');

    const user = await this.userModel.findOneAndDelete({ entityId });

    if (!user) throw new NotFoundException('User not found');

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}