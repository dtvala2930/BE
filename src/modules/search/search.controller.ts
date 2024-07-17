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

import { assign, compact, omit, split } from 'lodash';
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
    const dateNowTimeZone = new Date();
    const { user: userCurrent } = req;

    const data = compact(
      split(Buffer.from(payload.fileBase64, 'base64').toString(), /\r?\n/),
    );

    const resultsScrapped = [];

    const scrappingPromises = data.map((item) =>
      this.searchService.getDataFromScraping(item),
    );

    const scrappedData = await Promise.all(scrappingPromises);

    scrappedData.forEach((item) => {
      resultsScrapped.push(item);
    });

    const payloadAddSearch: IAddSearchPayload = {
      createdAt: dateNowTimeZone,
      updatedAt: dateNowTimeZone,
      userId: userCurrent.id,
      fileId: payload.id,
      ...omit(payload, ['id', 'fileBase64']),
    };

    const payloadAddSearchDetail: IAddSearchDetailPayload = {
      userId: userCurrent.id,
      fileId: payload.id,
      result: JSON.stringify(resultsScrapped),
    };

    try {
      await this.prismaService.$transaction(async (tx) => {
        //insert Table Search
        await tx.search.create({
          data: payloadAddSearch,
        });

        // insert Table SearchDetail
        await tx.searchDetail.create({
          data: payloadAddSearchDetail,
        });
      });
    } catch (error) {
      return new HttpException(
        'Fail to insert Search',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const resData: ResponseSuccessInterface = {
      statusCode: HttpStatus.OK,
      success: 'search-upload-file-success',
      data: data,
    };

    return res.status(HttpStatus.OK).json(resData);
  }
}
