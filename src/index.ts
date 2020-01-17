import Scraper from "~/Scraper";

(async (): Promise<void> => {
  await Scraper.run({
    headless: false,
    judges: [
      {
        judge: "Codeforces",
        credentials: { username: "fake", password: "fake" }
      },
      {
        judge: "UVa",
        credentials: { username: "fake", password: "fake" }
      },
      {
        judge: "URI",
        credentials: { username: "fake@gmail.com", password: "fake" }
      }
    ]
  });
})();
