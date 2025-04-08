import { type Locator, type Page } from "@playwright/test";

export class DashboardPage {
  private readonly page: Page;
  private readonly profileButton: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
  }

  async clickProfile() {
    await this.profileButton.click();
  }

  async clickLogout() {
    await this.logoutButton.click();
  }
}
