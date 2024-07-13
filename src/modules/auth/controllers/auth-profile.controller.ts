import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { assign } from 'lodash';
import { AuthGuard } from '@nestjs/passport';

import { ServiceGuard } from '../guards';

import { API_PREFIX_PATH } from '../../../utils/constant';
import { RequestHasUserDTO } from '../../../utils/request-has-user.dto';
import { ResponseSuccessInterface } from '../../../utils/interfaces';
import { LoggedInterface } from '../../../utils/interfaces/logged.interface';

@UseGuards(AuthGuard('jwt'), ServiceGuard)
@Controller(`${API_PREFIX_PATH}/auth`)
export class AuthProfileController {
  constructor() {}

  @Get('profile')
  async profile(@Req() req: RequestHasUserDTO & Request, @Res() res: Response) {
    const httpStatusCode = HttpStatus.OK;
    const resData: ResponseSuccessInterface = {
      statusCode: httpStatusCode,
      success: 'get-profile-success',
      data: null,
    };

    try {
      const { user } = req;
      const userCurrent: Partial<LoggedInterface> = user;

      assign(resData, {
        data: {
          ...userCurrent,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return res.status(httpStatusCode).json(resData);
  }
}
