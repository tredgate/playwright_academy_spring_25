import { test } from "@playwright/test";
import { pmtoolTexts } from "../../../src/assets/dictionary/text_dictionary.ts";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test("Using dictionaries to Reuse Text", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const username = process.env.PMTOOL_USERNAME as string;
  const password = process.env.PMTOOL_PASSWORD as string;

  await loginPage.openAndLogin(username, password).then((login) =>
    login.appHeaderHasText(
      pmtoolTexts.general.appHeader // ? Zde použijeme text z dictionary
    )
  );
});
