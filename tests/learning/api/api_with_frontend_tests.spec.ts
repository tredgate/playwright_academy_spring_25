import { expect, test } from "@playwright/test";

test.describe("Frontend with API Tests", () => {
  test("Login API Check", async ({ page }) => {
    await page.goto("http://localhost:3001/");
    await page.locator('[data-testid="username"]').fill("fifka_petr");
    await page.locator('[data-testid="password"]').fill("Tredgate2023#");
    const loginResponsePromise = page.waitForResponse(/\/auth\/login/); // ? Využití Regex pro zachycení URL, která obsahuje /auth/login
    await page.locator('button[data-testid="log_in"]').click();
    await loginResponsePromise;

    await page.locator('[data-testid="logout_button"]').click();
  });

  test("Test Intercepted Login API ", async ({ page }) => {
    await page.goto("http://localhost:3001/");
    await page.locator('[data-testid="username"]').fill("fifka_petr");
    await page.locator('[data-testid="password"]').fill("Tredgate2023#");
    const loginResponsePromise = page.waitForResponse(/\/auth\/login/); // ? Využití Regex pro zachycení URL, která obsahuje /auth/login
    await page.locator('button[data-testid="log_in"]').click();
    const loginResponse = await loginResponsePromise;
    const loginApiRequest = loginResponse.request();

    // ? Kontrola requestu, jeho url a metody
    const requestUrl = loginApiRequest.url();
    expect(requestUrl).toContain("/auth/login");
    const requestMethod = loginApiRequest.method();
    expect(requestMethod).toBe("POST");

    // ? Kontrola requestu, jeho body
    const requestBody = await loginApiRequest.postDataJSON();
    expect(requestBody.username).toBe("fifka_petr");
    expect(requestBody.password).toBe("Tredgate2023#");

    // ? Kontrola response, statusu a body
    const responseStatus = loginResponse.status();
    expect(responseStatus).toBe(201);
    const responseBody = await loginResponse.json();
    expect(responseBody.access_token).toBeDefined();
    expect(typeof responseBody.access_token).toBe("string");
  });
});
