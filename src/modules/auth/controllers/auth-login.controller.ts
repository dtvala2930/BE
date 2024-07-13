import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { assign } from 'lodash';

import { AuthService } from '../auth.service';
import { AuthLoginDTO } from '../dto/auth-login.dto';
import { API_PREFIX_PATH } from '../../../utils/constant';
import { ResponseSuccessInterface } from '../../../utils/interfaces';
import { JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN } from '../../../configs/app.config';
import { UserService } from '../../user/user.service';

@Controller()
export class AuthLoginController {
  logger = new Logger(AuthLoginController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post(`${API_PREFIX_PATH}/auth/login`)
  async loginLocal(@Body() authLoginDto: AuthLoginDTO, @Res() res: Response) {
    const resData: ResponseSuccessInterface = {
      statusCode: HttpStatus.OK,
      success: 'login-success',
      data: null,
    };

    try {
      const accountDB = await this.userService.getUserByField({
        email: authLoginDto.email,
      });

      if (accountDB === null) {
        throw new HttpException('login-unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const { password } = accountDB;
      const checkPassword = this.authService.comparePassword(
        authLoginDto.password,
        password,
      );

      if (!checkPassword) {
        throw new HttpException('login-unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const { access_token: token } =
        await this.authService.createTokenAndRefreshToken(
          accountDB.id,
          JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN,
        );

      const { exp: expires } = await this.authService.hanldeVerifyToken(token);

      assign(resData, {
        data: { token, expires },
      });
    } catch (error) {
      this.logger.error(JSON.stringify(error, null, 4));
      throw new HttpException(error.message, error.status);
    }

    return res.status(HttpStatus.OK).json(resData);
  }
}
