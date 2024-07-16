import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class SearchService {
  async getDataFromScraping() {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    await page.goto('https://www.google.com/search?q=youtube');

    const linkCount = await page.$$eval('a[href]', (links) => links.length);

    const total = await page.$eval('#result-stats', (anchor) => {
      return anchor.textContent;
    });

    // await browser.close();

    return { linkCount, total };
  }
}
