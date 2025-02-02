import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategys';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserModule } from '../user/user.module';
import { AuthLoginController } from './controllers/auth-login.controller';
import { JwtModule } from '@nestjs/jwt';
import {
  JWT_EXPIRED_TIME_TOKEN,
  JWT_SECRET_KEY,
} from '../../configs/app.config';
import { AuthRefreshTokenController } from './controllers/auth-refresh-token.controller';
import { AuthProfileController } from './controllers/auth-profile.controller';
import { AuthRegisterController } from './controllers/auth-register.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: JWT_EXPIRED_TIME_TOKEN },
    }),
  ],
  controllers: [
    AuthLoginController,
    AuthRefreshTokenController,
    AuthProfileController,
    AuthRegisterController,
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
