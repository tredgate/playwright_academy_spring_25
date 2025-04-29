import { expect, test } from "@playwright/test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { CreateNewProjectModal } from "../../../src/pages/pmtool/projects/create_new_project_modal.ts";
import path from "path";

test.describe("Pmtool Atomic Tests - Create Project Modal", async () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage
      .openPmtool()
      .then((login) => login.login("pw_skoleni", "TEG2023"))
      .then((login) => login.clickProjects())
      .then((login) => login.clickAddProject());
  });

  test("Modal Structure Tests", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);
    await test.step("Title Header Tests", async () => {
      await expect.soft(addProjectModal.titleHeader).toBeVisible();
      await expect.soft(addProjectModal.titleHeader).toHaveText("Project Info");
    });

    await test.step("Info Tab Tests", async () => {
      await expect.soft(addProjectModal.infoTab).toBeVisible();
      await expect.soft(addProjectModal.infoTab).toHaveText("Info");
    });

    await test.step("Priority Select Tests", async () => {
      await expect.soft(addProjectModal.prioritySelect).toBeVisible();
      // ? Hvězdička v toHaveTest() je zde proto, že v rámci tohoto labelu je pole povinné a je označeno hvězdičkou
      await expect.soft(addProjectModal.priorityLabel).toHaveText("*Priority");
      await expect.soft(addProjectModal.prioritySelect).toBeEnabled();

      // ? Ověření, že má select všechny options
      // ? Výběr options můžou potenciálně způsobit ukončení testů v případě, že option nebude existovat. Je dobré zvážit oddělení testů pro selecty do samostatných testů
      await addProjectModal.prioritySelect.selectOption({ label: "Urgent" }); // 34 = Urgent
      await expect.soft(addProjectModal.prioritySelect).toHaveValue("34");
      await addProjectModal.prioritySelect.selectOption({ label: "High" }); // 35 = High
      await expect.soft(addProjectModal.prioritySelect).toHaveValue("35");
    });

    await test.step("Status Select Tests", async () => {
      await expect.soft(addProjectModal.statusSelect).toBeVisible();
      await expect.soft(addProjectModal.statusLabel).toHaveText("*Status");
      await expect.soft(addProjectModal.statusSelect).toBeEnabled();
      // ? Ověření, že má select všechny options: New, Open, Waiting, Closed, Canceled (ano, je tu překlep v názvu)
      await addProjectModal.statusSelect.selectOption({ label: "New" }); // 37 = New
      await expect.soft(addProjectModal.statusSelect).toHaveValue("37");
      await addProjectModal.statusSelect.selectOption({ label: "Open" }); // 38 = Open
      await expect.soft(addProjectModal.statusSelect).toHaveValue("38");
      await addProjectModal.statusSelect.selectOption({ label: "Waiting" }); // 39 = Waiting
      await expect.soft(addProjectModal.statusSelect).toHaveValue("39");
      await addProjectModal.statusSelect.selectOption({ label: "Closed" }); // 40 = Closed
      await expect.soft(addProjectModal.statusSelect).toHaveValue("40");
      await addProjectModal.statusSelect.selectOption({ label: "Canceled" }); // 41 = Canceled
      await expect.soft(addProjectModal.statusSelect).toHaveValue("41");
    });

    await test.step("Name Input Tests", async () => {
      await expect.soft(addProjectModal.nameInput).toBeVisible();
      await expect.soft(addProjectModal.nameInput).toBeEnabled();
      await expect.soft(addProjectModal.nameLabel).toBeVisible();
      await expect.soft(addProjectModal.nameLabel).toHaveText("*Name");
      // ? Fill je potenciálně nebezpečná akce, protože může způsobit selhání testu v případě, že hodnota nebude existovat. Je dobré zvážit oddělení testů pro inputy do samostatných testů.
      await addProjectModal.nameInput.fill("Test Project");
      await expect.soft(addProjectModal.nameInput).toHaveValue("Test Project");
    });

    await test.step("Start Date Input Tests", async () => {
      await expect.soft(addProjectModal.startDateInput).toBeVisible();
      await expect.soft(addProjectModal.startDateInput).toBeEnabled();
      await expect.soft(addProjectModal.startDateLabel).toBeVisible();
      await expect
        .soft(addProjectModal.startDateLabel)
        .toHaveText("Start Date");
      // ? Fill je potenciálně nebezpečná akce, protože může způsobit selhání testu v případě, že hodnota nebude existovat. Je dobré zvážit oddělení testů pro inputy do samostatných testů.
      await addProjectModal.startDateInput.fill("2023-10-01");
      await expect
        .soft(addProjectModal.startDateInput)
        .toHaveValue("2023-10-01");
    });

    await test.step("Attachment Button Tests", async () => {
      await expect.soft(addProjectModal.attachmentsButton).toBeVisible();
      await expect
        .soft(addProjectModal.attachmentsButton)
        .toHaveText("Add Attachments");
      await expect.soft(addProjectModal.attachmentsLabel).toBeVisible();
      await expect
        .soft(addProjectModal.attachmentsLabel)
        .toHaveText("Attachments");
    });

    await test.step("Save Button Tests", async () => {
      await expect.soft(addProjectModal.saveButton).toBeVisible();
      await expect.soft(addProjectModal.saveButton).toHaveText("Save");
    });

    await test.step("Close Button Tests", async () => {
      await expect.soft(addProjectModal.closeButton).toBeVisible();
      await expect.soft(addProjectModal.closeButton).toHaveText("Close");
    });
  });

  test("Name Input Validation Message Test", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);
    await addProjectModal.triggerNameValidation();
    await expect.soft(addProjectModal.nameValidationDiv).toBeVisible();
    await expect
      .soft(addProjectModal.nameValidationDiv)
      .toHaveText("This field is required!");
  });

  test("Alert Message Test", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);
    await addProjectModal.triggerAlertMessage();
    await expect.soft(addProjectModal.alertMessageDiv).toBeVisible();
    await expect
      .soft(addProjectModal.alertMessageDiv)
      .toHaveText(
        "Some fields are required. They have been highlighted above."
      );
  });

  test("Upload Attachment Test", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);
    const filePath = path.resolve(
      __dirname,
      "../../../src/assets/upload_file.txt"
    );
    // ? Helper k vytvoření dynamické cesty k souboru
    // require("../../../src/assets/upload_file.txt");
    await addProjectModal.uploadFile(filePath);
    await expect(addProjectModal.uploadFilesList).toBeVisible();
  });

  test("Click Save Button Test", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);
    await addProjectModal.clickSave();
    // TODO: doplnit ověření, že se modal zavřel a že se otevřela stránka s úkoly
  });

  test("Click Close Button Test", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);
    await addProjectModal.clickClose();
    // TODO: doplnit ověření, že se modal zavřel a že se otevřela stránka s projekty
  });
});
