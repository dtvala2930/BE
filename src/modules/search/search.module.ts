import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  providers: [PrismaService, SearchService],
  controllers: [SearchController],
  exports: [],
})
export class SearchModule {}
