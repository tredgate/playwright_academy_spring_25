<<<<<<< HEAD
import { type Locator, type Page } from "@playwright/test";
=======
import { Locator, Page } from "@playwright/test";
>>>>>>> origin/main
import { LoginPage } from "./login_page.ts";

export class LostPasswordPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
<<<<<<< HEAD
  private readonly submitButton: Locator;
  private readonly emailInput: Locator;
=======
  private readonly emailInput: Locator;
  private readonly sendButton: Locator;
>>>>>>> origin/main
  private readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
<<<<<<< HEAD
    this.usernameInput = page.locator("//input[@placeholder='Username']");
    this.submitButton = page.locator("//button[@type='submit']");
    this.emailInput = page.locator("//input[@placeholder='Email']");
    this.backButton = page.locator("//button[@id='back-btn']");
=======
    this.usernameInput = page.locator('[name = "username"]');
    this.emailInput = page.locator('[name = "email"]');
    this.sendButton = page.locator('[type = "submit"]');
    this.backButton = page.locator("#back-btn");
>>>>>>> origin/main
  }

  async typeUsername(username: string): Promise<LostPasswordPage> {
    await this.usernameInput.fill(username);
    return this;
  }

<<<<<<< HEAD
  async clickSend(): Promise<LoginPage> {
    await this.submitButton.click();
    return new LoginPage(this.page);
  }

=======
>>>>>>> origin/main
  async typeEmail(email: string): Promise<LostPasswordPage> {
    await this.emailInput.fill(email);
    return this;
  }

<<<<<<< HEAD
=======
  async clickSend(): Promise<LoginPage> {
    await this.sendButton.click();
    return new LoginPage(this.page);
  }

>>>>>>> origin/main
  async clickBack(): Promise<LoginPage> {
    await this.backButton.click();
    return new LoginPage(this.page);
  }
}
