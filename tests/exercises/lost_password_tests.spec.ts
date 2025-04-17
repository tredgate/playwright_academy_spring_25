import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Fluent API exercise - e2e", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.clickPasswordForgotten())
    .then((lostPassword) => lostPassword.typeUsername("lost_password_user"))
    .then((lostPassword) => lostPassword.typeEmail("lost_password@tredgate.cz"))
    .then((lostPassword) => lostPassword.clickSend());
});

test("Fluent Exercise - click back", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.clickPasswordForgotten())
    .then((lostPassword) => lostPassword.clickBack());
});
