import Judge from "~/judges/Judge";
import { IJudgeCredentials } from "~/judges/interfaces";

class UVa extends Judge {
  async login(credentials: IJudgeCredentials): Promise<void> {
    const loginPage = await this.browser.newPage();

    //should be before goto function
    loginPage.on("dialog", dialog => {
      if (dialog.message().includes("Incorrect")) {
        dialog.accept();
      }
    });

    await loginPage.goto(
      "https://onlinejudge.org/index.php?option=com_comprofiler&task=login",
      { waitUntil: "domcontentloaded" }
    );

    await loginPage.evaluate(
      ({ username, password }) => {
        const qs = document.querySelector.bind(document);
        const usernameInput = qs("#mod_login_username");
        const passwordInput = qs("#mod_login_password");
        const rememberCheckbox = qs("#mod_login_remember");
        const submitBtn = qs("input[type='submit']");

        if (usernameInput && passwordInput && rememberCheckbox && submitBtn) {
          (usernameInput as HTMLInputElement).value = username;
          (passwordInput as HTMLInputElement).value = password;
          (rememberCheckbox as HTMLInputElement).click();
          (submitBtn as HTMLInputElement).click();
        } else {
          // TODO: handle possibly null elements due to UVa changes
        }
      },
      { ...credentials }
    );

    await new Promise(resolve => loginPage.once("domcontentloaded", resolve));
    // TODO: handle failed login "alert"

    await loginPage.close();
  }
}

export default UVa;
