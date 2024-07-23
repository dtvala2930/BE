import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { API_PREFIX_PATH } from '../../utils/constant';
import { ResponseSuccessInterface } from '../../utils/interfaces';

import { assign, omit } from 'lodash';
import { ServiceGuard } from '../auth/guards';
import { AuthGuard } from '@nestjs/passport';
import { SearchService } from './search.service';
import { RequestHasUserDTO } from '../../utils/request-has-user.dto';
import { UploadFileDto } from './dto/search.dto';
import { IAddSearchDetailPayload, IAddSearchPayload } from './utils/interface';
import { PrismaService } from '../../prisma.service';

@UseGuards(AuthGuard('jwt'), ServiceGuard)
@Controller(`${API_PREFIX_PATH}/search`)
export class SearchController {
  logger = new Logger(SearchController.name);
  constructor(
    private readonly searchService: SearchService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getSearchByUserId(
    @Req() req: RequestHasUserDTO & Request,
    @Res() res: Response,
  ) {
    const resData: ResponseSuccessInterface = {
      statusCode: HttpStatus.OK,
      success: `get-search-list-success`,
      data: null,
    };

    const { user: userCurrent } = req;

    try {
      const searchData = await this.searchService.getAllSearchByUserLoggedIn(
        userCurrent.id,
      );
      assign(resData, {
        data: searchData,
      });
    } catch (error) {
      this.logger.log(error);
      throw new HttpException(error.message, error.status);
    }

    return res.status(HttpStatus.OK).json(resData);
  }

  @Post('/upload')
  async index(
    @Res() res: Response,
    @Req() req: RequestHasUserDTO & Request,
    @Body() payload: UploadFileDto,
  ) {
    const resData: ResponseSuccessInterface = {
      statusCode: HttpStatus.OK,
      success: 'search-upload-file-success',
      data: null,
    };

    const dateNowTimeZone = new Date();
    const { user: userCurrent } = req;

    const keywords = this.searchService.getKeyWords(payload.fileBase64);

    const resultsScrapped = await this.searchService.getScrappedData(keywords);

    const payloadAddSearch: IAddSearchPayload = {
      createdAt: dateNowTimeZone,
      updatedAt: dateNowTimeZone,
      userId: userCurrent.id,
      fileId: payload.id,
      ...omit(payload, ['id', 'fileBase64']),
    };

    const payloadAddSearchDetail: IAddSearchDetailPayload[] = [];

    for (const item of resultsScrapped) {
      payloadAddSearchDetail.push({
        userId: userCurrent.id,
        fileId: payload.id,
        result: JSON.stringify(item),
      });
    }

    await this.searchService.uploadSearchListAndDetail(
      payloadAddSearch,
      payloadAddSearchDetail,
    );

    return res.status(HttpStatus.OK).json(resData);
  }
}
