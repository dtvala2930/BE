import { Injectable } from '@nestjs/common';
// import { SBR_WS_ENDPOINT } from '../../configs/app.config';
import puppeteer from 'puppeteer';
// import puppeteer from 'puppeteer-core';

@Injectable()
export class SearchService {
  async getDataFromScraping(searchKeyword: string) {
    // const browser = await puppeteer.connect({
    //   browserWSEndpoint: SBR_WS_ENDPOINT,
    // });

    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${searchKeyword}`);

    const pageHTML = await page.content();
    console.log(pageHTML);

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

    return { linkCount, total, adwordsCount };
  }
}
