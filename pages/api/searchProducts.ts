import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { searchPrompt: userSearch } = req.body;

    if (!userSearch) {
      return res.status(400).json({ error: 'Search parameter not provided' });
    }

    let browser;

    try {
      browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto('https://www.amazon.com');
      await page.type('#twotabsearchtextbox', userSearch);
      await page.keyboard.press('Enter');
      await page.waitForNavigation();

      const html = await page.content(); // Get the entire HTML content
      const $ = cheerio.load(html); // Load the HTML content

      const prices = $('span.a-offscreen')
        .map((index, element) => $(element).text())
        .get();

      const titles = $('span.a-size-base-plus.a-color-base.a-text-normal')
        .map((index, element) => $(element).text())
        .get();

      const reviews = $('span.a-size-base.s-underline-text')
        .map((index, element) => $(element).text())
        .get();

      const imageUrls = $('img.s-image')
        .map((index, element) => $(element).attr('src'))
        .get();

      const products = [];

      for (let i = 0; i < titles.length; i++) {
        const item = {
          price: prices[i],
          title: titles[i],
          review: reviews[i],
          imageUrl: imageUrls[i],
        };
        products.push(item);
      }

      return res.status(200).json({ products });
    } catch (error: any) {
      return res.status(500).json({ error: `An error occurred: ${error.message}` });
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
