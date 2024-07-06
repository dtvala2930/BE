import { Injectable } from '@nestjs/common';

import { QueryDataAndMeta } from '../../utils/interfaces/query-data-and-meta';

import { UserListQueryDTO } from './dto/user-list-query.dto';
import { PrismaService } from '../../prisma.service';

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
}
