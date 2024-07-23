import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { API_PREFIX_PATH } from '../../utils/constant';
import { ResponseSuccessInterface } from '../../utils/interfaces';

import { assign } from 'lodash';
import { ServiceGuard } from '../auth/guards';
import { AuthGuard } from '@nestjs/passport';
import { RequestHasUserDTO } from '../../utils/request-has-user.dto';

import { SearchDetailService } from './searchDetail.service';
import { SearchDetailQueryDTO } from './dto/search-detail-request.dto';

@UseGuards(AuthGuard('jwt'), ServiceGuard)
@Controller(`${API_PREFIX_PATH}/search`)
export class SearchDetailController {
  logger = new Logger(SearchDetailController.name);
  constructor(private readonly searchDetailService: SearchDetailService) {}

  @Get(':fileId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getSearchByUserId(
    @Req() req: RequestHasUserDTO & Request,
    @Res() res: Response,
    @Param('fileId') fileId: string,
    @Query() queryDTO: SearchDetailQueryDTO,
  ) {
    const resData: ResponseSuccessInterface = {
      statusCode: HttpStatus.OK,
      success: `get-search-detail-success`,
      data: null,
    };

    const { user: userCurrent } = req;

    try {
      const { data, metaData } = await this.searchDetailService.getDetail(
        userCurrent.id,
        fileId,
        queryDTO,
      );
      assign(resData, {
        data: data,
        metaData,
      });
    } catch (error) {
      this.logger.log(error);
      throw new HttpException(error.message, error.status);
    }

    return res.status(HttpStatus.OK).json(resData);
  }
}
