import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Using API requests in Frontend", () => {
  test("Register and Login via API to app", async ({ page, request }) => {
    // * Příprava testovacích dat (pomocí faker)
    const username = faker.internet.username();
    const password = faker.internet.password();
    const email = faker.internet.email();

    // * Registrace uživatele pomocí API POST http://localhost:3000/user/register
    await request.post("http://localhost:3000/user/register", {
      data: {
        username,
        password,
        email,
      },
    });

    // * Přihlášení uživatele pomocí API POST http://localhost:3000/user/login a uložení response do proměnné
    const loginResponse = await request.post(
      "http://localhost:3000/auth/login",
      {
        data: {
          username,
          password,
        },
      }
    );

    const loginResponseBody = await loginResponse.json();
    const accessToken = loginResponseBody.access_token;

    // * Nastavení tokenu do cookies pro frontend
    await page.context().addCookies([
      {
        name: "access_token",
        value: accessToken,
        path: "/",
        domain: "localhost",
      },
    ]);

    // * Otevření frontend aplikace
    await page.goto("http://localhost:3001/app");
    await expect(page.locator('[data-testid="logout_button"]')).toBeVisible();
  });
});
