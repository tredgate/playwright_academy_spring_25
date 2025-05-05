import { expect, Locator, Page } from "@playwright/test";
import { CreateNewProjectModal } from "./projects/create_new_project_modal.ts";

export class ProjectsPage {
  private readonly page: Page;
  private readonly addProjectButton: Locator;
  private readonly projectListDiv: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addProjectButton = page.locator('//button[@test_id="Add Project"]');
    this.projectListDiv = page.locator("#slimScroll");
  }

  async clickAddProject(): Promise<CreateNewProjectModal> {
    // ? Čekáme na zobrazení tabulky s projekty, abychom se ujistili, že je stránka načtena
    await expect(this.projectListDiv).toBeVisible();
    await this.addProjectButton.click();
    return new CreateNewProjectModal(this.page);
  }
}
