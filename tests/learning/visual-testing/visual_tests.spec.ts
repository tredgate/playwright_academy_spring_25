import { test, expect } from "@playwright/test";
import path from "path";

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

  test("Masking Elements", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/web-actions.html");
    await expect(page).toHaveScreenshot("masked_elements_test.png", {
      mask: [page.locator("#hover-box")],
      fullPage: true,
    });
  });

  test.skip("Masking not Working", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
    await expect(page).toHaveScreenshot("mask_not_working_test.png", {
      mask: [page.locator('[data-testid="dynamic-size-box"]')],
      fullPage: true,
    });
  });

  test("Hide Elements with CSS", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/dynamic-content.html");
    await expect(page).toHaveScreenshot("hide_elements_test.png", {
      stylePath: path.resolve(
        __dirname,
        "../../../src/assets/visual_tests.css"
      ), // Cesta k CSS, který skryje dynamické prvky na stránce pomocí   visibility: hidden; display: none;
      fullPage: true,
    });
  });

  test("Image Visual Test", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/index.html");
    await expect(page.locator("#playwright-logo")).toHaveScreenshot(
      "image_test.png"
    );
  });

  test("Module Visual Test", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/contact.html");
    await expect(page.locator("#practiceForm")).toHaveScreenshot(
      "module_test.png"
    );
  });

  test("Input Visual Test", async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/registration.html");
    const phoneInput = page.locator("#phone");
    await phoneInput.fill("123456789");
    await expect(phoneInput).toHaveScreenshot("input_test.png");
  });
});
/*
Cvičení - zařazení do page objektů (⌛10:00)
Vytvořte nový vizuální test, který bude umístěný v metodě page objektu. Otestujte vizuálně formulář na přihlašovací stránce Pmtoolu.

Page Object: src/pages/pmtool/login_page.ts 
Lokátor formuláře: .content-login

Do metody nemusíte vkládat žádné parametry.
*/
