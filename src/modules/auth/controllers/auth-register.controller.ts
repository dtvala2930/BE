import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from '../auth.service';
import { API_PREFIX_PATH } from '../../../utils/constant';
import { ResponseSuccessInterface } from '../../../utils/interfaces';
import { UserService } from '../../user/user.service';
import { AuthRegisterDTO } from '../dto/auth-register.dto';
import { PrismaService } from '../../../prisma.service';
import { User } from '@prisma/client';
import { assign, omit } from 'lodash';

@Controller()
export class AuthRegisterController {
  logger = new Logger(AuthRegisterController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post(`${API_PREFIX_PATH}/auth/register`)
  async register(
    @Body(ValidationPipe) authRegisterDto: AuthRegisterDTO,
    @Res() res: Response,
  ) {
    const resData: ResponseSuccessInterface = {
      statusCode: HttpStatus.OK,
      success: 'register-success',
      data: null,
    };

    const dateNowTimeZone = new Date();

    try {
      const accountDB = await this.userService.getUserByField({
        email: authRegisterDto.email,
      });

      if (accountDB) {
        throw new HttpException('Email already taken', HttpStatus.BAD_REQUEST);
      }

      const password = authRegisterDto.password;
      const hashedPassword = this.authService.hashPassword(password);

      const payloadRegister: Omit<User, 'id' | 'refresh_token'> = {
        email: authRegisterDto.email,
        firstName: authRegisterDto.firstName,
        lastName: authRegisterDto.lastName,
        password: hashedPassword,
        createdAt: dateNowTimeZone,
        updatedAt: dateNowTimeZone,
      };

      assign(
        resData,
        omit(payloadRegister, ['createdAt', 'updatedAt', 'password', 'id']),
      );

      await this.prismaService.user.create({ data: payloadRegister });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }

    return res.status(HttpStatus.OK).json(resData);
  }
}
