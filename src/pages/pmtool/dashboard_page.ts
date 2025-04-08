import { type Locator, type Page } from "@playwright/test";

export class DashboardPage {
  readonly profileButton: Locator;
  readonly logoutButton: Locator;

  constructor(public readonly page: Page) {
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
