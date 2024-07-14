import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import * as compression from 'compression';
import { CLIENT_URL, PORT } from './configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          connectSrc: [
            `'self'`,
            `'unsafe-inline'`,
            `https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com`,
          ],
          scriptSrc: [
            `'self'`,
            `'unsafe-inline'`,
            `https://*.googletagmanager.com https://tagmanager.google.com`,
          ],
          styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            `https://tagmanager.google.com https://www.googletagmanager.com https://fonts.googleapis.com https://*.googletagmanager.com`,
          ],
          imgSrc: [
            `'self'`,
            `data:`,
            `https://*.googletagmanager.com https://ssl.gstatic.com https://www.gstatic.com https://*.google-analytics.com`,
          ],
          fontSrc: [`'self'`, `data:`, `https://fonts.gstatic.com`],
        },
      },
    }),
  );

  app.enableCors({
    origin: [CLIENT_URL, /^https:\/\/interview-3d75e\.web\.app\/?$/],
  });

  app.use(compression());

  app.use(bodyParser.json({ limit: '2048mb' }));
  app.use(bodyParser.urlencoded({ limit: '2048mb', extended: true }));

  await app.listen(PORT);
}
bootstrap();
