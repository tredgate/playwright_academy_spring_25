import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page";
import { DashboardPage } from "../../../src/pages/pmtool/dashboard_page";

test.describe("Asserts - Testing with Playwright", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage
      .openPmtool()
      .then((login) => login.typeUsername("pw_skoleni"))
      .then((login) => login.typePassword("TEG2023"))
      .then((login) => login.clickLogin());
  });

  test("toContainText Test", async ({ page }) => {
    await expect(page.locator("#welcome-page-header")).toContainText(
      "Vítej v testovací aplikaci."
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
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.clickProjects();
    await page.locator('[test_id="search_input"]').fill("Test");

    await expect(page.locator('[test_id="search_input"]')).toHaveValue("Test");
  });
});

test.describe("Login Page Tests", () => {
  test("Soft Assert Test", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPmtool();
    // ? Tento assert selže, ale test bude pokračovat
    await expect.soft(page.locator(".form-title")).toHaveText("Přihlášení");

    await loginPage
      .typeUsername("pw_skoleni")
      .then((login) => login.typePassword("TEG2023"))
      .then((login) => login.clickLogin());
  });

  test("Negative Test", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPmtool();

    await expect(page.locator(".alert-danger")).not.toBeVisible();
  });
});
