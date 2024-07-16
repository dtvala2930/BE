import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
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

import { assign, compact, split } from 'lodash';
import { ServiceGuard } from '../auth/guards';
import { AuthGuard } from '@nestjs/passport';
import { SearchService } from './search.service';
import { RequestHasUserDTO } from '../../utils/request-has-user.dto';
import { UploadFileDto } from './dto/search.dto';
import { SBR_WS_ENDPOINT } from '../../configs/app.config';
import puppeteer from 'puppeteer';

@UseGuards(AuthGuard('jwt'), ServiceGuard)
@Controller(`${API_PREFIX_PATH}/search`)
export class SearchController {
  logger = new Logger(SearchController.name);
  constructor(private readonly searchService: SearchService) {}

  //   @Get()
  //   @UsePipes(new ValidationPipe({ transform: true }))
  //   async getSearchByUserId(
  //     @Query() queryDTO: UserListQueryDTO,
  //     @Res() res: Response,
  //   ) {
  //     const resData: ResponseSuccessInterface = {
  //       statusCode: HttpStatus.OK,
  //       success: `get-search-list-success`,
  //       data: null,
  //     };

  //     try {
  //       const { data, metaData } = await this.userService.getAll(queryDTO);
  //       assign(resData, {
  //         data,
  //         metaData,
  //       });
  //     } catch (error) {
  //       this.logger.log(error);
  //       throw new HttpException(error.message, error.status);
  //     }

  //     return res.status(HttpStatus.OK).json(resData);
  //   }

  @Post('/upload/:userId')
  async index(
    @Res() res: Response,
    @Req() req: RequestHasUserDTO & Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UploadFileDto,
  ) {
    const { user: userCurrent } = req;
    console.log(userCurrent, userId, payload);

    const data = compact(
      split(Buffer.from(payload.fileBase64, 'base64').toString(), /\r?\n/),
    ).slice(1);

    const { linkCount, total } = await this.searchService.getDataFromScraping();

    console.log(linkCount, total);

    const resData: ResponseSuccessInterface = {
      statusCode: HttpStatus.OK,
      success: 'search-upload-file-success',
      data: data,
    };

    return res.status(HttpStatus.OK).json(resData);
  }
}
