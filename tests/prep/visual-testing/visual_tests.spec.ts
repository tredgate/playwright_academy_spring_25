import { test, expect } from "@playwright/test";

test.describe("Visual Tests", () => {
  test("Simple Visual Test", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
    await expect(page).toHaveScreenshot("simple_test.png");
  });

  test("Failing Visual Test", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
    // ? Tento krok přidáme až po vygenerování snapshotu, abychom nasimulovali pád vizuálního testu
    await page.locator('[data-testid="double-click-box"]').dblclick();
    await expect(page).toHaveScreenshot("failing_test.png");
  });
});
