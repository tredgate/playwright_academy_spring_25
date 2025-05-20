import { test, expect } from "@playwright/test";

const mockJson = [
  {
    _id: "6458e52258806fbe512a3324",
    userId: 1001,
    accountId: "34405",
    balance: 5000000,
    transactionLimits: {
      dailyLimit: 100000,
      monthlyLimit: 987654,
      _id: "6458e52258806fbe512a3325",
    },
    accountType: "MOCK ÚČET PETRA",
    loginHistory: [],
    transactionHistory: [],
    createdAt: "2023-05-08T12:03:46.954Z",
    __v: 0,
  },
];

test("TEG#B Accounts mock", async ({ page }) => {
  // * Nastavení mocku pro: http://localhost:3000/accounts/user/1
  await page.route("*/**/accounts/user/**", async (route) => {
    await route.fulfill({ json: mockJson });
  });

  await page.goto("http://localhost:3001");
  await page.locator('[data-testid="username"]').fill("fifka_petr");
  await page.locator('[data-testid="password"]').fill("Tredgate2023#");
  const loginResponsePromise = page.waitForResponse(/\/auth\/login/);
  await page.locator('[data-testid="log_in"]').click();
  await loginResponsePromise;
  await page.locator('[data-testid="accounts_section_link"]').click();
  await expect(page.locator('[data-testid="loader"]')).not.toBeVisible();
  await expect(page.locator('[data-testid="title"]')).toHaveText("Account");
});
