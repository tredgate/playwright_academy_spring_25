import { test } from "@playwright/test";
import path from "path";

test.describe("Forms Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://tredgate.com/webtrain/registration.html");
  });

  test("fill and pressSequentially Test", async ({ page }) => {
    await page.locator("#name").fill("Start");
    await page.locator("#name").fill("End");
    await page.locator("#name").pressSequentially("Kde toto bude?");
    // ? Pokud potřebujeme prodlevu mezi jednotlivými stisky kláves (například pro comboboxy), použijeme:
    await page.locator("#name").pressSequentially("ABCD", { delay: 500 }); // ? Odezva mezi stisky kláves je 500ms (0.5s)
  });

  test("select Test", async ({ page }) => {
    await page.locator("#gender").selectOption("male"); // ? výběr pomocí value prvku <option value="male">
    await page.locator("#gender").selectOption({ label: "Female" }); // ? výběr pomocí labelu (textu) prvku <option value="1">Female</option>
  });

  test("checkbox, radio button Test", async ({ page }) => {
    // ? Zakliknutí radio buttonu: Phone
    await page.locator("#contact-phone").check();
    // ? Zakliknutí checkboxu pro sporty
    await page.locator("#interests-sports").check();
  });

  test("date fill test", async ({ page }) => {
    await page.locator("#date-of-birth").fill("1990-01-01"); // ? Vyplnění data pomocí formátu YYYY-MM-DD
  });

  test("File Upload Test", async ({ page }) => {
    // ? Spuštění čekání na událost filechooser, která se spustí po kliknutí na input pro nahrání souboru.
    // ? Všimněte si, že nepoužíváme await waitForEvent, protože to by nám zastavilo test na čekání na událost filechooser.
    // ? Tímto způsobem můžeme spustit čekání na událost filechooser a zároveň provést akci, která tuto událost spustí.
    const fileChooserPromise = page.waitForEvent("filechooser");
    const filePath = path.resolve(
      __dirname,
      "../../../src/assets/upload_file.txt"
    );
    // ? Klikneme na input pro nahrání souboru - fileChooserPromise nám čeká na událost filechooser paralelně
    await page.locator("#file-upload").click();
    // ? Nyní spustíme await fileChooserPromise, který počká na to, až se chytí událost nahrávání souboru v OS
    const fileChooser = await fileChooserPromise;
    // ? Nyní nastavíme soubor, který se nahraje do inputu pro nahrání souboru
    await fileChooser.setFiles(filePath);

    // ? čekání tu máme, abychom v logu viděli, že se soubor vybere
    await page.waitForTimeout(2000);
  });

  test("Slider - range", async ({ page }) => {
    // ? Nastavení hodnoty slideru na 5
    await page.locator("#experience").fill("5");

    // ? Nastavení hodnoty slideru na 10
    await page.locator("#experience").fill("10");

    // ? Nastavení hodnoty slideru na 1
    await page.locator("#experience").fill("1");
  });
});
