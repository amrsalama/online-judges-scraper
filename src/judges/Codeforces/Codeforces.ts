import Judge from "../Judge";
import {
  InvalidLoginCredentialsError,
  NullDOMElementError
} from "../../errors";
import { IJudgeCredentials } from "../interfaces";

class Codeforces extends Judge {
  async login(credentials: IJudgeCredentials): Promise<void> {
    const loginPage = await this.browser.newPage();

    await loginPage.goto("https://codeforces.com/enter", {
      waitUntil: "domcontentloaded"
    });

    try {
      await loginPage.evaluate(
        ({ username, password }) => {
          return new Promise((resolve, reject) => {
            const qs = document.querySelector.bind(document);
            const usernameInput = qs("#handleOrEmail");
            const passwordInput = qs("#password");
            const rememberCheckbox = qs("#remember");
            const submitBtn = qs("input[type='submit']");

            if (
              usernameInput &&
              passwordInput &&
              rememberCheckbox &&
              submitBtn
            ) {
              (usernameInput as HTMLInputElement).value = username;
              (passwordInput as HTMLInputElement).value = password;
              (rememberCheckbox as HTMLInputElement).click();
              (submitBtn as HTMLInputElement).click();
              resolve();
            } else {
              reject();
            }
          });
        },
        { ...credentials }
      );
    } catch (error) {
      throw new NullDOMElementError("Codeforces");
    }

    await new Promise(resolve => loginPage.once("domcontentloaded", resolve));

    try {
      await loginPage.evaluate(() => {
        return new Promise((resolve, reject) => {
          const qs = document.querySelector.bind(document);
          const invalidPassword = qs(".for__password");
          return invalidPassword ? reject() : resolve();
        });
      });
    } catch (error) {
      throw new InvalidLoginCredentialsError("Codeforces");
    }

    await loginPage.close();
  }
}

export default Codeforces;
