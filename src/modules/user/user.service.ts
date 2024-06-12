import { Injectable } from '@nestjs/common';
import { differenceWith, isEqual, range } from 'lodash';

import { QueryDataAndMeta } from '@utils/interfaces/query-data-and-meta';

import { UserListQueryDTO } from './dto/user-list-query.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(queryParams: UserListQueryDTO) {
    const { limit, page } = queryParams;

    const skip = page > 1 ? (page - 1) * limit : 0;

    const users = await this.prismaService.user.findMany({
      take: limit,
      skip,
      include: {
        meetings: {
          select: {
            id: true,
            startDay: true,
            endDay: true,
          },
        },
      },
    });

    const usersWithMeetingDaysAndFree = users.map((user) => {
      const meetingDays = user.meetings.map(({ startDay, endDay }) => [
        startDay,
        endDay,
      ]);

      const allDays = range(1, user.days + 1);
      const daysFreeFromMeetings = differenceWith(
        allDays,
        meetingDays,
        isEqual,
      );

      return {
        ...user,
        meetingDays,
        daysWithoutMeetings: daysFreeFromMeetings.length,
      };
    });

    const total = await this.prismaService.user.count();

    return new QueryDataAndMeta({
      data: usersWithMeetingDaysAndFree,
      total: total,
      queryParams,
    });
  }
}
