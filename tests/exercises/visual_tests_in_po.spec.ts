import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Visual Check in Page Object", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool().then((login) => login.loginFormVisualCheck());
});
