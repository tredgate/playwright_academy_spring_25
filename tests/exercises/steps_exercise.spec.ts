import { test } from "@playwright/test";
import { LoginPage } from "src/pages/pmtool/login_page";

test("Exercise: test.step", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openAndLogin("pw_skoleni", "TEG2023")
    .then((dashboard) => dashboard.logout());
});
