// dictionaries.spec.ts
// tests/learning/dictionary

import { test } from "@playwright/test";
import { pmtoolTexts } from "src/assets/dictionaries/dictionary";
import { LoginPage } from "src/pages/pmtool/login_page";

test("Using Dictionaries to Reuse Texts", async ({ page }) => {
  const username = process.env.PMTOOL_USERNAME as string;
  const password = process.env.PMTOOL_PASSWORD as string;
  const loginPage = new LoginPage(page);

  await loginPage
    .openAndLogin(username, password)
    .then((dashboard) =>
      dashboard.appHeaderHasText(pmtoolTexts.general.appHeader)
    );
});
