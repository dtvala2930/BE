import { Injectable, NotFoundException } from '@nestjs/common';

import { QueryDataAndMeta } from '../../utils/interfaces/query-data-and-meta';

import { UserListQueryDTO } from './dto/user-list-query.dto';
import { PrismaService } from '../../prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAll(queryParams: UserListQueryDTO) {
    const { limit, page } = queryParams;

    const skip = page > 1 ? (page - 1) * limit : 0;

    const users = await this.prismaService.user.findMany({
      take: limit,
      skip,
    });

    const total = await this.prismaService.user.count();

    return new QueryDataAndMeta({
      data: users,
      total: total,
      queryParams,
    });
  }

  async getUserByField({
    id,
    email,
    refresh_token,
  }: {
    id?: number;
    email?: string;
    refresh_token?: string;
  }) {
    const user = await this.prismaService.user.findFirst({
      where: { OR: [{ id }, { email }, { refresh_token }] },
    });

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }

    return user;
  }

  async updateUser(id: number, updateData: Partial<User>) {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: {
          id,
        },
        data: updateData,
      });
      return updatedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${id} not found.`);
        }
      }
      throw error;
    }
  }
}
