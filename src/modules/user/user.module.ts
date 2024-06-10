import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { AppModule } from 'src/app.module';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UsersController],
})
export class UserModule {}
