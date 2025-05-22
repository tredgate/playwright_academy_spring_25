import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Register and Login via API to App", async ({ page, request }) => {
  const email = faker.internet.exampleEmail();
  const username = faker.internet.username();
  const password = faker.internet.password();

  await request.post("http://localhost:3000/user/register", {
    data: {
      username,
      email,
      password,
    },
  });

  const loginResponse = await request.post("http://localhost:3000/auth/login", {
    data: {
      username,
      password,
    },
  });

  const loginResponseBody = await loginResponse.json();
  const accessToken = loginResponseBody.access_token;

  // * Nastavení Cookie v prohlížeči přes page.context().addCookies
  await page.context().addCookies([
    {
      name: "access_token",
      value: accessToken,
      domain: "localhost",
      path: "/",
    },
  ]);

  // ? Jelikož jsme vložili token do cookies prohlížeče, nemusíme se v něm již přihlašovat
  await page.goto("http://localhost:3001/app");
  await expect(page.locator('[data-testid="logout_button"]')).toBeVisible();
});
