import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "../login_page.ts";

export class ProjectTasksPage {
  private readonly page: Page;
  private readonly profileButton: Locator;
  private readonly logoutButton: Locator;
  private readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
    this.pageHeader = page.locator("h3.page-title");
  }

  async headerHasText(headerText: string): Promise<ProjectTasksPage> {
    await expect(this.pageHeader).toHaveText(headerText);
    return this;
  }

  async clickProfile(): Promise<ProjectTasksPage> {
    await this.profileButton.click();
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
