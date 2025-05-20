import { test, expect } from "@playwright/test";

test.describe("Visual Tests", () => {
  test("Simple Visual Test", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
    await expect(page).toHaveScreenshot("simple_test.png");
  });

  test.skip("Failing Visual Test", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
    // ? Tento krok přidáme až po vygenerování snapshotu, abychom nasimulovali pád vizuálního testu
    await page.locator('[data-testid="double-click-box"]').dblclick();
    await expect(page).toHaveScreenshot("failing_test.png");
  });

  test("Full Page Visual Test", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
    await expect(page).toHaveScreenshot("full_page_test.png", {
      fullPage: true,
    });
  });

  test("maxDiffPixelRatio Test", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
    // ? Tento krok přidáme až po vygenerování snapshotu, abychom nasimulovali pád vizuálního testu
    await page.locator('[data-testid="double-click-box"]').dblclick();
    await expect(page).toHaveScreenshot("low_sensitivity_test.png", {
      maxDiffPixelRatio: 0.2,
    });
  });

  test("Masking Elements", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
    await expect(page).toHaveScreenshot("masked_elements_test.png", {
      mask: [page.locator("#hover-box")],
      fullPage: true,
    });
  });
});
