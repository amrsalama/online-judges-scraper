import puppeteer, { Browser } from "puppeteer";
import { IScraperOptions, JudgesObject } from "./interfaces";
import { Codeforces, UVa, URI } from '../judges'

export default class Scraper {
  private constructor(private browser: Browser) { }

  public static async run(options: IScraperOptions): Promise<Scraper> {
    const { headless = true, judges } = options;
    try {
      // TODO: establish relationship between judges and scraper
      const browser = await puppeteer.launch({ headless });
      const scraper = new Scraper(browser);

      const JUDGES: JudgesObject = {
        Codeforces: new Codeforces(browser),
        UVa: new UVa(browser),
        URI: new URI(browser)
      };

      const logins: Promise<void>[] = judges.map(({ judge, credentials }) => {
        const Judge = JUDGES[judge];
        return Judge.login(credentials);
      });

      await Promise.all(logins);

      return scraper;
    } catch (error) {
      // TODO: handle puppeteer launch error
      throw new Error();
    }
  }
}
