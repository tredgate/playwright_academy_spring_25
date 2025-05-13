import { expect, Locator, Page } from "@playwright/test";
import { CreateNewProjectModal } from "./projects/create_new_project_modal.ts";

export class ProjectsPage {
  private readonly page: Page;
  private readonly addProjectButton: Locator;
  private readonly projectsListDiv: Locator;
  private readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addProjectButton = page.locator('//button[@test_id="Add Project"]');
    this.projectsListDiv = page.locator("#slimScroll");
    this.pageHeader = page.locator("h3.page-title");
  }

  async headerHasText(headerText: string): Promise<ProjectsPage> {
    await expect(this.pageHeader).toHaveText(headerText);
    return this;
  }

  async clickAddProject(): Promise<CreateNewProjectModal> {
    await expect(this.projectsListDiv).toBeVisible();
    await this.addProjectButton.click();
    return new CreateNewProjectModal(this.page);
  }
}
