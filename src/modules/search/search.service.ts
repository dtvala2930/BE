import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { PrismaService } from '../../prisma.service';
import { compact, split } from 'lodash';
import { IAddSearchDetailPayload, IAddSearchPayload } from './utils/interface';
// import puppeteer from 'puppeteer-core';
// import { SBR_WS_ENDPOINT } from '../../configs/app.config';

@Injectable()
export class SearchService {
  constructor(private readonly prismaService: PrismaService) {}

  getKeyWords(fileBase64: string) {
    const data = compact(
      split(Buffer.from(fileBase64, 'base64').toString(), /\r?\n|\n/),
    );

    const dataFile =
      data.length === 1 && data[0].includes(',')
        ? data[0].split(',').map((item) => item.trim())
        : data;

    if (dataFile.length === 0 || dataFile.length > 100) {
      throw new HttpException(
        dataFile.length === 0
          ? 'The data file is empty. It must contain between 1 and 100 rows.'
          : 'The data file must contain no more than 100 rows.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return dataFile;
  }

  async getScrappedData(dataFromUploadedFile: string[]) {
    const resultsScrapped = [];

    const scrappingPromises = dataFromUploadedFile.map(
      async (item) => await this.getDataFromScraping(item),
    );

    const scrappedData = await Promise.all(scrappingPromises);
    scrappedData.forEach((item) => {
      resultsScrapped.push(item);
    });

    return resultsScrapped;
  }

  async getDataFromScraping(searchKeyword: string) {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();

    try {
      // const browser = await puppeteer.connect({
      //   browserWSEndpoint: SBR_WS_ENDPOINT,
      // });

      await page.goto(`https://www.google.com/search?q=${searchKeyword}`);

      const pageHTML = await page.content();

      const chunkSize = 50000;
      const chunks = [];
      for (let i = 0; i < pageHTML.length; i += chunkSize) {
        chunks.push(pageHTML.substring(i, i + chunkSize));
      }

      const linkCount = await page.$$eval('a[href]', (links) => links.length);

      const total = await page.$eval('#result-stats', (anchor) => {
        return anchor.textContent;
      });

      let adwordsCount = 0;
      const adwordsElement =
        (await page.$('div.pla-unit')) || (await page.$('div.mnr-c')) || null;
      if (adwordsElement) {
        adwordsCount = await page.$$eval('div.pla-unit', (anchor) => {
          return anchor.length;
        });
      } else {
        adwordsCount = 0;
      }

      await browser.close();

      return {
        pageHTML: chunks,
        searchKeyword,
        linkCount: linkCount.toString(),
        total,
        adwordsCount: adwordsCount.toString(),
      };
    } catch (error) {
      await browser.close();
      throw new HttpException(`Can not scrape data`, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllSearchByUserLoggedIn(userId: number) {
    const searchData = await this.prismaService.search.findMany({
      where: { userId },
      select: {
        fileName: true,
        fileId: true,
      },
    });

    if (!searchData) {
      throw new HttpException(
        `Can not get all search`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return searchData;
  }

  async uploadSearchListAndDetail(
    payloadAddSearch: IAddSearchPayload,
    payloadAddSearchDetail: IAddSearchDetailPayload[],
  ) {
    try {
      await this.prismaService.$transaction(
        async (tx) => {
          // Insert search data in batches
          await tx.search.create({
            data: payloadAddSearch,
          });

          // Insert search detail data in batches
          await tx.searchDetail.createMany({
            data: payloadAddSearchDetail,
          });
        },
        { timeout: 120000 },
      );
    } catch (error) {
      throw new HttpException(
        'Fail to insert Search list and detail',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
