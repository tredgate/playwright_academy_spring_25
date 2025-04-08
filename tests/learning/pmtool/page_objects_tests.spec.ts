// page_objects_tests.spec.ts
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test("Test Page Objects", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openPmtool();
  await loginPage.typeUsername("pw_academy");
  await loginPage.typePassword("Playwright321!");
  await loginPage.clickLogin();
});
