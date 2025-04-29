import { expect, test } from "@playwright/test";

test("Check if assert haveText checks hidden elements", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");

  const hiddenElement = page.locator('[data-testid="hover-message"]');
  await expect(hiddenElement).toHaveText(
    "This is a hover message that appears when you hover over the box."
  );
});
