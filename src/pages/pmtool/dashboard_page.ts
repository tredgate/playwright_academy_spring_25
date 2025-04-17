import { type Locator, type Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class DashboardPage {
<<<<<<< HEAD
  readonly profileButton: Locator;
  readonly logoutButton: Locator;
  private readonly page: Page;
=======
  private readonly page: Page;
  private readonly profileButton: Locator;
  private readonly logoutButton: Locator;
>>>>>>> origin/main

  constructor(page: Page) {
    this.page = page;
    this.profileButton = page.locator("#user_dropdown");
    this.logoutButton = page.locator("#logout");
  }

  async clickProfile(): Promise<DashboardPage> {
<<<<<<< HEAD
=======
    // ! waitForTimeout je tzv. explicitní čekání - TOTO NENÍ DOBŘE, těmto čekání bychom se měli vyvarovat, protože zpomalují testy.
    await this.page.waitForTimeout(1500);
>>>>>>> origin/main
    await this.profileButton.click();
    return this;
  }

  async clickLogout(): Promise<LoginPage> {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }
}
