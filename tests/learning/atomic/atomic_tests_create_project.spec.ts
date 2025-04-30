//atomic_tests_create_project.spec.ts
//learning/atomic
import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { CreateNewProjectModal } from "../../../src/pages/pmtool/projects/create_new_project_modal.ts";

test.describe("Pmtool Atomic Tests - Create Project Modal", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage
      .openPmtool()
      .then((login) => login.login("pw_skoleni", "TEG2023"))
      .then((dashboard) => dashboard.clickProjects())
      .then((projects) => projects.clickAddProject());
  });

  test("Form Structure Tests", async ({ page }) => {
    // ? Vytváříme PO před stepem, abychom jej mohli využít v každém test.step a nemuseli jej vytvářet stále dokola.
    const addProjectModal = new CreateNewProjectModal(page);

    await test.step("Title Header Test", async () => {
      await expect.soft(addProjectModal.titleHeader).toBeVisible();
      await expect.soft(addProjectModal.titleHeader).toHaveText("Project Info");
    });

    await test.step("Info Tab Tests", async () => {
      await expect.soft(addProjectModal.infoTab).toBeVisible();
      await expect.soft(addProjectModal.infoTab).toHaveText("Info");
    });

    await test.step("Priority Select Tests", async () => {
      await expect.soft(addProjectModal.prioritySelect).toBeVisible();
      await expect.soft(addProjectModal.priorityLabel).toBeVisible();
      await expect.soft(addProjectModal.priorityLabel).toHaveText("*Priority");
      await expect.soft(addProjectModal.prioritySelect).toBeEnabled();
      // ? Ověření, že má select všechny options
      // ? Výběr options můžou potenciálně způsobit ukončení testů v případě, že option nebude existovat. Je dobré zvážit oddělení testů pro selecty do samostatných testů
      await addProjectModal.prioritySelect.selectOption({ label: "Urgent" }); // 34 = Urgent
      await expect.soft(addProjectModal.prioritySelect).toHaveValue("34");
      await addProjectModal.prioritySelect.selectOption({ label: "High" }); // 35 = High
      await expect.soft(addProjectModal.prioritySelect).toHaveValue("35");
    });
  });
});
