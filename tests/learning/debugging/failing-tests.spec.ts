import { expect, test } from "@playwright/test";

test("Failing test", async ({ page }) => {
  await page.goto("http://tredgate.com/pmtool/");
  await expect(page.locator("#not_existing")).toBeVisible();
});
