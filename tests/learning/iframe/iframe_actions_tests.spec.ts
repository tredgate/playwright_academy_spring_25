import { test } from "@playwright/test";

test("Working with iframe", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  const frame = await page.frameLocator(
    '[data-testid="test-automation-iframe"]'
  );
  await frame.locator("#name").fill("Text v iframe");
});
