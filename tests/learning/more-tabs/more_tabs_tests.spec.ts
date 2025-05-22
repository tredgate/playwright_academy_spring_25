import { expect, test } from "@playwright/test";

test("Creating new Window in Browser", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  await page.locator("#username").fill("pw_academy");
  await page.locator("#password").fill("Playwright321!");
  await page.locator(".btn").click();
  await expect(page.locator("#user_notifications_report")).toBeVisible();
  await page.locator("#user_dropdown").click();
  await page.locator("#logout").click();

  // ? Vytvoření nového okna v prohlížeči
  const newPage = await page.context().newPage();
  await newPage.goto("https://tredgate.com/webtrain/registration.html");
  // ? S novým oknem interagujeme pomocí námi vytvořené proměnné newPage
  await newPage.locator("#name").fill("Test nového okna");

  // ? Můžeme zároveň také pracovat s původním oknem
  await page.locator("#username").fill("pw_academy");
});

test("Catching new Window", async ({ page }) => {
  await page.goto("https://tredgate.com/webtrain/web-actions.html");
  // ? Vytvoření čekání na nové okno
  const pagePromise = page.context().waitForEvent("page");
  // ? Kliknutí na odkaz, který otevře nové okno
  await page.locator('[data-testid="new-tab-link"]').click();
  // ? Uložení nového okna do proměnné
  const registrationPage = await pagePromise;
  // ? Interakce s novým oknem
  await registrationPage.locator("#name").fill("Test nového okna");

  // ? čekání na zobrazení nového okna v timeline UI Mode
  await registrationPage.waitForTimeout(500);
});
