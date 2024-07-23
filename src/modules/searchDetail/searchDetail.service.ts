import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { SearchDetailQueryDTO } from './dto/search-detail-request.dto';
import { QueryDataAndMeta } from '../../utils/interfaces/query-data-and-meta';
import { ISearchDetails } from './utils/interface';

@Injectable()
export class SearchDetailService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDetail(
    userId: number,
    fileId: string,
    queryParams: SearchDetailQueryDTO,
  ) {
    const { limit, page } = queryParams;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.searchDetail.findMany({
        where: {
          userId,
          fileId,
        },
        skip,
        take: limit,
        select: {
          fileId: true,
          result: true,
        },
      }),

      this.prismaService.searchDetail.count({
        where: {
          userId,
          fileId,
        },
      }),
    ]);

    return new QueryDataAndMeta<ISearchDetails>({
      data,
      total,
      queryParams,
    });
  }
}
