import test from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";

test("Exercise: Dashboard Header Check", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.login("pw_academy", "Playwright321!"))
    .then((dashboard) => dashboard.profileButtonIsVisible())
    .then((dashboard) => dashboard.appHeaderHasText("TEG Project Management"));
});
