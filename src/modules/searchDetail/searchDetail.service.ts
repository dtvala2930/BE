import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class SearchDetailService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOne(userId: number, fileId: string) {
    const searchDetailData = await this.prismaService.searchDetail.findFirst({
      where: {
        userId,
        fileId,
      },
      select: { fileId: true, result: true },
    });

    if (!searchDetailData) {
      throw new HttpException(
        `Can not get Search detail`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return searchDetailData;
  }
}
