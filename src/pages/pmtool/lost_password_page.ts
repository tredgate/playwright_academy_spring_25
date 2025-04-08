import { type Locator, type Page } from "@playwright/test";
import { LoginPage } from "./login_page.ts";

export class LostPasswordPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly submitButton: Locator;
  private readonly emailInput: Locator;
  private readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("//input[@placeholder='Username']");
    this.submitButton = page.locator("//button[@type='submit']");
    this.emailInput = page.locator("//input[@placeholder='Email']");
    this.backButton = page.locator("//button[@id='back-btn']");
  }

  async typeUsername(username: string): Promise<LostPasswordPage> {
    await this.usernameInput.fill(username);
    return this;
  }

  async clickSend(): Promise<LoginPage> {
    await this.submitButton.click();
    return new LoginPage(this.page);
  }

  async typeEmail(email: string): Promise<LostPasswordPage> {
    await this.emailInput.fill(email);
    return this;
  }

  async clickBack(): Promise<LoginPage> {
    await this.backButton.click();
    return new LoginPage(this.page);
  }
}
