import { Locator, Page } from "@playwright/test";
import { ProjectTasksPage } from "./project_tasks_page.ts";
import { ProjectsPage } from "../projects_page.ts";

export class CreateNewProjectModal {
  private readonly page: Page;
  readonly nameInput: Locator;
  readonly saveButton: Locator;
  readonly titleHeader: Locator;
  readonly infoTab: Locator;
  readonly prioritySelect: Locator;
  readonly priorityLabel: Locator;
  readonly statusSelect: Locator;
  readonly statusLabel: Locator;
  readonly nameLabel: Locator;
  readonly startDateInput: Locator;
  readonly startDateLabel: Locator;
  readonly descriptionLabel: Locator;
  readonly attachmentsLabel: Locator;
  readonly attachmentsButton: Locator;
  readonly attachmentsInput: Locator;
  readonly closeButton: Locator;
  readonly nameValidationDiv: Locator;
  readonly alertMessageDiv: Locator;
  readonly uploadFilesList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('//div[@data-testid="Name"]/input');
    this.saveButton = page.locator('//button[@type="submit"]');
    this.titleHeader = page.locator("h4.modal-title");
    this.prioritySelect = page.locator(
      '//div[@data-testid="Priority"]//select'
    );
    this.priorityLabel = page.locator(
      '//div[@data-testid="Priority"]/../../label'
    );
    this.statusSelect = page.locator('//div[@data-testid="Status"]//select');
    this.statusLabel = page.locator('//div[@data-testid="Status"]/../../label');
    this.nameLabel = page.locator('//div[@data-testid="Name"]/../../label');
    this.startDateInput = page.locator(
      '//div[@data-testid="Start Date"]//input'
    );
    this.startDateLabel = page.locator(
      '//div[@data-testid="Start Date"]/../../label'
    );
    this.attachmentsButton = page.locator(
      '//div[@data-testid="Attachments"]//div[contains(@id, "uploadifive-uploadifive_attachments_upload")]'
    );
    this.attachmentsLabel = page.locator(
      '//div[@data-testid="Attachments"]/../../label'
    );
    this.attachmentsInput = page.locator(
      '//div[@data-testid="Attachments"]//input[contains(@id, "uploadifive_attachments_upload")]'
    );
    this.infoTab = page.locator('//ul[@id="form_tabs"]//li[1]');
    this.descriptionLabel = page.locator(
      '//div[@data-testid="Description"]/../../label'
    );
    this.closeButton = page.locator(".btn-close");
    this.nameValidationDiv = page.locator('//div[@data-testid="Name"]/label');
    this.alertMessageDiv = page.locator(".alert-danger");
    this.uploadFilesList = page.locator(
      '//div[contains(@id, "uploadifive_attachments_list")]'
    );
  }

  async typeName(nameValue: string): Promise<CreateNewProjectModal> {
    await this.nameInput.fill(nameValue);
    return this;
  }

  async clickSave(): Promise<ProjectTasksPage> {
    await this.saveButton.click();
    return new ProjectTasksPage(this.page);
  }

  async triggerNameValidation(): Promise<CreateNewProjectModal> {
    // ? Ověření, že je pole pro název prázdné
    await this.nameInput.clear();
    // ? Po kliknutí na tlačítko "Uložit" by se měla zobrazit validační hláška
    await this.saveButton.click();
    return this;
  }

  async triggerAlertMessage(): Promise<CreateNewProjectModal> {
    // ? Pro zobrazení validační hlášky je potřeba kliknout na tlačítko "Uložit" bez vyplnění povinných polí, my na to využijeme už existující metodu triggerNameValidation. Mohlo by se zdát, že jde o duplicitu, ale z pohledu psaní testů nám tato metoda může zjednodušit hledání této metody v testech.
    // ? V testech pak můžeme použít triggerAlertMessage() a nemusíme se starat o to, co přesně se děje v této metodě.
    return await this.triggerNameValidation();
  }

  async uploadFile(filePath: string): Promise<CreateNewProjectModal> {
    const fileChooser = this.page.waitForEvent("filechooser");
    await this.attachmentsButton.click();
    const fileInput = await fileChooser;
    await fileInput.setFiles(filePath);
    return this;
  }

  async clickClose(): Promise<ProjectsPage> {
    await this.closeButton.click();
    return new ProjectsPage(this.page);
  }
}
