import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Test Structure - Describe", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.openPmtool();
  });

  // ? Test máme bez { page } z toho důvodu, že si ho přebíráme v beforeEach. Pokud bychom ale chtěli s page pracovat, museli bychom si jej zpět přidat
  test("Pmtool Login", async () => {
    await loginPage.login("pw_skoleni", "TEG2023");
  });

  test("Login and Logout", async () => {
    await loginPage
      .login("pw_skoleni", "TEG2023")
      .then((dashboard) => dashboard.clickProfile())
      .then((dashboard) => dashboard.clickLogout());
  });
});
