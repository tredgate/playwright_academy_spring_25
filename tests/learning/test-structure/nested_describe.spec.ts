//nested_describe.spec.ts
//složka: tests/learning/test-structure
import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Testování vnořených describe - Pmtool", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPmtool();
  });

  test("Test v prvním describe - pmtool assert page header", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.pageHeaderHasText("Login");
  });

  test.describe("Vnořený describe, pmtool Dashboard", () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      // ? Již není potřebujeme loginPage.openPmtool(), protože v předchozím beforeEach jsem již pmtool otevřeli
      await loginPage.login("pw_academy", "Playwright321!");
    });

    test("Test ve vnořeném describe - pmtool dashboard", async ({ page }) => {
      await expect(page.locator("#welcome-page-header")).toBeVisible();
    });
  });
});
