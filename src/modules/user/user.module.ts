import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UsersController],
  exports: [UserService],
})
export class UserModule {}
