import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { LoggedInterface } from '../../../utils/interfaces/logged.interface';
import { JWT_SECRET_KEY } from '../../../configs/app.config';
import express from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { omit } from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private user: LoggedInterface;
  logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: () => '',
      ignoreExpiration: true,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async authenticate(req: express.Request) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');

      if (!token) {
        return this.fail('login-unauthorized', 401);
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: JWT_SECRET_KEY,
        });

        const id = payload.accountId;

        const accountDB = await this.userService.getUserByField({ id });

        this.user = {
          id,
          firstName: accountDB.firstName,
          lastName: accountDB.lastName,
          email: accountDB.email,
        };

        return this.success(omit(this.user), {});
      } catch {
        return this.fail('login-unauthorized', 401);
      }
    } else {
      return this.fail('login-unauthorized', 401);
    }
  }
}
