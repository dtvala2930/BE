import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SecureHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.header('X-Content-Type-Options', 'nosniff');
    res.header(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains',
    );
    next();
  }
}
