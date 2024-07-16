import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { NODE_ENV, PUPPETEER_EXECUTABLE_PATH } from '../../configs/app.config';

@Injectable()
export class SearchService {
  async getDataFromScraping() {
    const browser = await puppeteer.launch({
      headless: 'shell',
      executablePath: NODE_ENV
        ? PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
      args: [
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--single-process',
        '--no-zygote',
      ],
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
