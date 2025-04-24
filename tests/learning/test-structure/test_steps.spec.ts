import { test } from "@playwright/test";
import { DashboardPage } from "src/pages/pmtool/dashboard_page";
import { LoginPage } from "src/pages/pmtool/login_page";

test("Using test.step", async ({ page }) => {
  await test.step("Přihlášení do Pmtool", async () => {
    const loginPage = new LoginPage(page);
    await loginPage
      .openPmtool()
      .then((login) => login.typeUsername("pw_skoleni"))
      .then((login) => login.typePassword("TEG2023"))
      .then((login) => login.clickLogin());
  });

  await test.step("Odhlášení z Pmtool", async () => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage
      .clickProfile()
      .then((dashboard) => dashboard.clickLogout());
  });
});

test("Using test.step in Page Objects", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.typeUsername("pw_skoleni"))
    .then((login) => login.typePassword("TEG2023"))
    .then((login) => login.clickLogin())
    .then((dashboard) => dashboard.logout());
});
