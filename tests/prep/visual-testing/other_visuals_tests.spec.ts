import { test, expect } from "@playwright/test";
import path from "path";

test("Simple Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/eshop");
  // Homepage obsahuje dynamické prvky, otevřeme si produkt, jehož vzhled je stabilní
  await page.getByText("Apple Cinema 30").click();
  // Počkáme na načtení detailu produktu
  await expect(page.locator("h1")).toHaveText('Apple Cinema 30"');
  // Provedeme vizuální kontrolu
  await expect(page).toHaveScreenshot("simple-eshop.png");
});

test("Simple Full Page Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/eshop");
  // Homepage obsahuje dynamické prvky, otevřeme si produkt, jehož vzhled je stabilní
  await page.getByText("Apple Cinema 30").click();
  // Počkáme na načtení detailu produktu
  await expect(page.locator("h1")).toHaveText('Apple Cinema 30"');
  // Provedeme vizuální kontrolu
  await expect(page).toHaveScreenshot("simple-eshop-full-page.png", {
    fullPage: true, // Tento parametr zajistí, že se zachytí celá stránka
  });
});

// Tento test je připravený pro nasimulování pádu vizuálního testu
test.skip("Failed Visual Test", async ({ page }) => {
  await page.goto("https://tredgate.com/eshop");
  // Spusťte generování snapshotu bez timeoutu, následně pro nasimulování pádu animací odstraňte komentář z následujícího řádku
  //await page.waitForTimeout(5000);
  await expect(page).toHaveScreenshot(
    "simple-eshop-full-page-no-animations.png",
    {
      fullPage: true,
    }
  );
});

test("Masking Dynamic Data in Projects Table", async ({ page }) => {
  await page.goto("https://tredgate.com/pmtool");
  // Přihlásíme se do aplikace
  await page.locator("#username").fill("protest");
  await page.locator("#password").fill("copilotProtest1");
  await page.locator("[type='submit']").click();
  // Otevřeme stránku s projekty
  await page.locator("#Projects").click();
  // Počkáme na načtení tabulky s projekty
  await expect(page.locator(".table-striped")).toBeVisible();
  // Provedeme vizuální kontrolu s maskováním dynamických dat
  await expect(page).toHaveScreenshot("projects-table-masked.png", {
    mask: [
      page.locator("//td"), // Maskování všech buněk tabulky
      page.locator('[test_id="search_input"]'), // Maskování vyhledávacího pole
    ],
    fullPage: true,
  });
});

test("Hiding Dynamic Data by CSS in Tredgate.cz", async ({ page }) => {
  await page.goto("https://tredgate.cz/");
  await page.locator(".cmplz-deny").click(); // skrytí cookie banneru
  await expect(page).toHaveScreenshot("tredgate-hidden-elements.png", {
    fullPage: true,
    stylePath: path.resolve(__dirname, "homepage_hidden_elements.css"), // Cesta k CSS, který skryje dynamické prvky na stránce pomocí   visibility: hidden; display: none;
  });
});
