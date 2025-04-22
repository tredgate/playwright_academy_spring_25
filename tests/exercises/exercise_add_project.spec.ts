import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/pmtool/login_page.ts";
import { faker } from "@faker-js/faker";

test("Exercise: Create Project", async ({ page }) => {
  const projectName =
    "PetruvProjekt" + faker.number.int({ min: 10000, max: 99999 });
  const loginPage = new LoginPage(page);

  await loginPage
    .openPmtool()
    .then((login) => login.login("pw_skoleni", "TEG2023"))
    .then((dashboard) => dashboard.clickProjects())
    .then((projects) => projects.clickAddProject())
    .then((createProject) => createProject.typeName(projectName))
    .then((createProject) => createProject.clickSave())
    .then((tasks) => tasks.clickProfile())
    .then((tasks) => tasks.clickLogout());
});
