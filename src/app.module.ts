import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ThrottlerModule } from '@nestjs/throttler';

import { UserModule } from './modules/user/user.module';
import {
  API_PREFIX_PATH,
  THROTTLE_LIMIT,
  THROTTLE_TTL,
} from './utils/constant';
import { NoXPoweredByMiddleware } from './middlewares/no-x-powered-by.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { SecureHeaderMiddleware } from './middlewares/secure-header.middleware';

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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NoXPoweredByMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(SecureHeaderMiddleware).forRoutes('*');
  }
}
