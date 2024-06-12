import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  // Apply middleware compression
  app.use(bodyParser.json({ limit: '2048mb' }));
  app.use(bodyParser.urlencoded({ limit: '2048mb', extended: true }));
  app.use(compression());

  await app.listen(3000);
}
bootstrap();
