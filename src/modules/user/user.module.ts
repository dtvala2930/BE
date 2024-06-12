import { Module, forwardRef } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import { UserService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UsersController],
})
export class UserModule {}
