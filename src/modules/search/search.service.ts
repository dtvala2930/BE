import { Injectable } from '@nestjs/common';
import { SBR_WS_ENDPOINT } from '../../configs/app.config';
import puppeteer from 'puppeteer-core';

@Injectable()
export class SearchService {
  async getDataFromScraping() {
    const browser = await puppeteer.connect({
      browserWSEndpoint: SBR_WS_ENDPOINT,
    });

    const page = await browser.newPage();
    await page.goto('https://www.google.com/search?q=youtube');

    const linkCount = await page.$$eval('a[href]', (links) => links.length);

    const total = await page.$eval('#result-stats', (anchor) => {
      return anchor.textContent;
    });

    await browser.close();

    return { linkCount, total };
  }
}
