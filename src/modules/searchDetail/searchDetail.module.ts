import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { SearchDetailService } from './searchDetail.service';
import { SearchDetailController } from './searchDetail.controller';

@Module({
  providers: [PrismaService, SearchDetailService],
  controllers: [SearchDetailController],
  exports: [],
})
export class SearchDetailModule {}
