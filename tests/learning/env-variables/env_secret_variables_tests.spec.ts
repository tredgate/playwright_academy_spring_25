// env_secret_variables_tests.spec.ts
// tests/learning/env-variables
import { test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test("Login with environment variables (dotenv)", async ({ page }) => {
  // ? process.env může vrátit undefined, proto musíme přetypovat na string pomocí "as string", jinak nám TypeScript hodí syntax chybu při použití username:
  // ? Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  // ? Type 'undefined' is not assignable to type 'string'.
  const username = process.env.PMTOOL_USERNAME as string;
  const password = process.env.PMTOOL_PASSWORD as string;

  const loginPage = new LoginPage(page);

  await loginPage.openAndLogin(username, password);
});
