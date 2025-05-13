import { Page } from "@playwright/test";
import { LoginPage } from "src/pages/pmtool/login_page";

export async function loginAndOpenProjects(
  page: Page,
  username: string,
  password: string
) {
  const loginPage = new LoginPage(page);
  return await loginPage
    .openAndLogin(username, password)
    .then((dashboard) => dashboard.clickProjects());
}
