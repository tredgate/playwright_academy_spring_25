// first_tests.spec.ts
import { test } from "@playwright/test";

// ? Struktura testu, můžeme využít zkratku pwt (pw-test), která obsahuje snippet se základní strukturou testu (musíme mít plugin: Playwright Test Snippets od Mark Skelton)
test("První test", async ({ page }) => {
  // Testovací kroky
  await page.goto("https://tredgate.com/pmtool/");
  await page.locator("#username").fill("pw_academy");
  await page.locator("#password").fill("Playwright321!");
  await page.locator(".btn").click();
});

/*
npm install --save-dev eslint @eslint/js typescript typescript-eslint eslint-config-prettier
*/
