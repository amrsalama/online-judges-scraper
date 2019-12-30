import puppeteer, { Browser } from "puppeteer";
import { IScraperOptions } from "./interfaces";
import { JUDGES } from "./constants";

export default class Scraper {
  private constructor(private browser: Browser) {}

  public static async run(options: IScraperOptions): Promise<Scraper> {
    const { headless = true, judges } = options;
    try {
      // TODO: establish relationship between judges and scraper
      const browser = await puppeteer.launch({ headless });
      const scraper = new Scraper(browser);

      const logins: Promise<void>[] = [];

      judges?.forEach(({ judge, credentials }) => {
        const Judge = JUDGES[judge];
        logins.push(new Judge(browser).login(credentials));
      });

      await Promise.all(logins);

      return scraper;
    } catch (error) {
      // TODO: handle puppeteer launch error
      throw new Error();
    }
  }
}
