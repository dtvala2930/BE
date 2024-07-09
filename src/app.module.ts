import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import {
  API_PREFIX_PATH,
  THROTTLE_LIMIT,
  THROTTLE_TTL,
} from './utils/constant';
import { UserModule } from './modules/user/user.module';
import { NoXPoweredByMiddleware } from './middlewares/no-x-powered-by.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { SecureHeaderMiddleware } from './middlewares/secure-header.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionsFilter } from './filters/global-exception.filter';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist/public'),
      exclude: [`${API_PREFIX_PATH}/(.*)`],
    }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: THROTTLE_TTL, limit: THROTTLE_LIMIT }],
    }),
    UserModule,
    AuthModule,
    GatewayModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NoXPoweredByMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(SecureHeaderMiddleware).forRoutes('*');
  }
}
