import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Lost Password test - E2E", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.clickPasswordForgotten())
    .then((lostPassword) => lostPassword.typeEmail("email@test"))
    .then((lostPassword) => lostPassword.typeUsername("abcd"))
    .then((lostPassword) => lostPassword.clickSend());
});

test("Lost Password test - Click back", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.clickPasswordForgotten())
    .then((lostPassword) => lostPassword.clickBack());
});
