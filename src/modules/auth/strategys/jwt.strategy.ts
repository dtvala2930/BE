import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { LoggedInterface } from '../../../utils/interfaces/logged.interface';
import { JWT_SECRET_KEY } from '../../../configs/app.config';
import express from 'express';
import { verifyToken } from '../../paseto/paseto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private user: LoggedInterface;
  logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: () => '',
      ignoreExpiration: true,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async authenticate(req: express.Request) {
    const token = req.headers['authorization'];
    const payload = await verifyToken(token?.replace('Bearer ', ''));

    if (!payload) {
      return this.fail('login-unauthorized', 401);
    }

    const id = +payload?.id;

    const accountDB = {
      id: 1,
      firstName: 'Nguyen',
      lastName: 'Tan',
      email: 'dt.duytan1999@gmail.com',
    };

    if (!accountDB) {
      return this.fail('login-unauthorized', 401);
    }

    this.user = {
      id,
      firstName: accountDB.firstName,
      lastName: accountDB.lastName,
      email: accountDB.email,
    };

    return this.success(this.user, {});
  }
}
