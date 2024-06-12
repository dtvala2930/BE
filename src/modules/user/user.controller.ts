import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { assign } from 'lodash';

import { API_PREFIX_PATH } from '../../utils/constant';
import { ResponseSuccessInterface } from '../../utils/interfaces';

import { UserService } from './user.service';
import { UserListQueryDTO } from './dto/user-list-query.dto';

@Controller(`${API_PREFIX_PATH}/users`)
export class UsersController {
  logger = new Logger(UsersController.name);
  constructor(private readonly userService: UserService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUsers(@Query() queryDTO: UserListQueryDTO, @Res() res: Response) {
    const resData: ResponseSuccessInterface = {
      statusCode: HttpStatus.OK,
      success: `get-user-list-success`,
      data: null,
    };

    try {
      const { data, metaData } = await this.userService.getAll(queryDTO);

      assign(resData, {
        data,
        metaData,
      });
    } catch (error) {
      this.logger.log(error);
      throw new HttpException(error.message, error.status);
    }

    return res.status(HttpStatus.OK).json(resData);
  }
}
