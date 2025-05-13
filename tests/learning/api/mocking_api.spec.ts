import { test, expect } from "@playwright/test";
test("TEG#B Accounts mock", async ({ page }) => {
  // * NASTAVENI MOCK JSON RESPONSE
  const json = [
    {
      _id: "123456",
      userId: 1,
      accountId: "10001",
      balance: 0,
      transactionLimits: {
        dailyLimit: 10000,
        monthlyLimit: 50000,
        _id: "654321",
      },
      accountType: "MOCK ÚČET",
      loginHistory: [],
      transactionHistory: [],
      createdAt: "2023-05-06T21:05:38.291Z",
      __v: 0,
    },
  ];

  // * MOCKOVÁNÍ API
  await page.route("*/**/accounts/user/**", async (route) => {
    await route.fulfill({ json });
  });

  // * KROKY NA FRONTEND
  await page.goto("http://localhost:3001/");
  await page.locator('[data-testid="username"]').fill("fifka_petr");
  await page.locator('[data-testid="password"]').fill("Tredgate2023#");
  const loginResponsePromise = page.waitForResponse(/\/auth\/login/); // ? Využití Regex pro zachycení URL, která obsahuje /auth/login
  await page.locator('button[data-testid="log_in"]').click();
  await loginResponsePromise;
  await page.locator('[data-testid="accounts_section_link"]').click();
  await expect(page.locator('[data-testid="loader"]')).not.toBeVisible();
  await expect(page.locator('[data-testid="title"]')).toHaveText("Account");
});
