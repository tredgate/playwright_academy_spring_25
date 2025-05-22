import { expect, test } from "@playwright/test";
const ariaSnapshot = `- dialog "Info Dialog":
  - heading "Info Dialog" [level=3]
  - paragraph: This dialog provides additional information for accessibility testing.
  - button "Close dialog": Close`;

test("Exercise: ARIA Snapshots", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/aria-testing.html");
  await expect(
    page.locator('[aria-labelledby="dialog-title"]')
  ).toMatchAriaSnapshot(ariaSnapshot);
});
