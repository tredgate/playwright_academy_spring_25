import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test("Fluent API - Login Test", async ({ page }) => {
  const loginPage = await new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.typeUsername("pw_skoleni"))
    .then((login) => login.typePassword("TEG2023"))
    .then((login) => login.clickLogin())
    .then((dashboard) => dashboard.clickProfile())
    .then((dashboard) => dashboard.clickLogout());
});
