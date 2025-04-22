import { expect, test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";
test("Exercise: Add Project Tests", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .openPmtool()
    .then((login) => login.login("pw_skoleni", "TEG2023"))
    .then((dashboard) => dashboard.clickProjects());
  await expect(page.locator(".table-scrollable table")).toBeVisible();
  await page.locator('//button[@test_id="Add Project"]').click();
  await expect(page.locator('div[data-testid="Name"]')).toBeVisible();
  await expect(page.locator("button[type='submit']")).toHaveText("Save");
});
