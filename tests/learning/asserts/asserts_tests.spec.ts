// asserts_tests.spec.ts
// asserts
import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { DashboardPage } from "../../../src/pages/pmtool/dashboard_page.ts";

test.describe("Asserts - Testing with Playwright", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage
      .openPmtool()
      .then((login) => login.login("pw_skoleni", "TEG2023"));
  });

  test("toContainText Test", async ({ page }) => {
    await expect(page.locator("#welcome-page-header")).toContainText(
      "Vítej v testovací aplikaci"
    );
  });

  test.skip("FAILING: toContainText Test", async ({ page }) => {
    await expect(page.locator("#welcome-page-header")).toContainText(
      "Vítej v testovací aplikaci BLBOST"
    );
  });

  test("toHaveText Test", async ({ page }) => {
    await expect(page.locator("#welcome-page-header")).toHaveText(
      "Vítej v testovací aplikaci Tredgate Project"
    );
  });

  test("toBeVisible Test", async ({ page }) => {
    await expect(page.locator(".logo img")).toBeVisible();
  });

  test("toHaveValue Test", async ({ page }) => {
    const dashboardProject = new DashboardPage(page);
    await dashboardProject.clickProjects();

    const assertText = "Test";

    await page.locator('[test_id="search_input"]').fill(assertText);
    await expect(page.locator('[test_id="search_input"]')).toHaveValue(
      assertText
    );
  });
});
