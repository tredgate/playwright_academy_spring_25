import { expect, test } from "@playwright/test";

test.describe("Frontend with API Tests", () => {
  test("Login API Check", async ({ page }) => {
    await page.goto("http://localhost:3001");
    await page.locator('[data-testid="username"]').fill("fifka_petr");
    await page.locator('[data-testid="password"]').fill("Tredgate2023#");
    // ? Spouštíme listenera (posluchač) na doručení response api, která obsahuje cestu: /auth/login
    const loginResponsePromise = page.waitForResponse(/\/auth\/login/);
    // ? Klikáme na log in tlačítko, čímž se z frontendu pošle request na API server
    await page.locator('[data-testid="log_in"]').click();
    // ? Čekáme až se doručí response pro login
    const loginResponse = await loginResponsePromise;
    await page.locator('[data-testid="logout_button"]').click();

    const loginRequest = loginResponse.request();

    // * Testování request části API
    expect(loginRequest.url()).toBe("http://localhost:3000/auth/login");
    expect(loginRequest.method()).toBe("POST");

    const loginRequestBody = await loginRequest.postDataJSON();
    expect(loginRequestBody.username).toBe("fifka_petr");
    expect(loginRequestBody.password).toBe("Tredgate2023#");

    // * Testování response části API
    expect(loginResponse.status()).toBe(201);

    const loginResponseBody = await loginResponse.json();
    expect(loginResponseBody.access_token).toBeDefined();
    expect(typeof loginResponseBody.access_token).toBe("string");
  });
});
