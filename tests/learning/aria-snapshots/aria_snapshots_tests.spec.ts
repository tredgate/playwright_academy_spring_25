//aria_snapshots_tests.spec.ts
// tests/src/learning

import { expect, test } from "@playwright/test";

const formAriaSnapshot = `- form "Correct ARIA Form":
  - heading "Correct ARIA Form" [level=3]
  - text: "Name:"
  - textbox "Name:"
  - text: "Email:"
  - textbox "Email:"
  - button "Submit contact form": Submit`;

test("Aria Snapshot Test", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/aria-testing.html");
  await expect(
    page.locator('[aria-labelledby="correct-form-label"]')
  ).toMatchAriaSnapshot(formAriaSnapshot);
});
