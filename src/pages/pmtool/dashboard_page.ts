import { type Locator, type Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class DashboardPage {
  private readonly page: Page;
  private readonly profileButton: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
  }

  async clickProfile(): Promise<DashboardPage> {
    // ! waitForTimeout je tzv. explicitní čekání - TOTO NENÍ DOBŘE, těmto čekání bychom se měli vyvarovat, protože zpomalují testy.
    await this.page.waitForTimeout(1500);
    await this.profileButton.click();
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
