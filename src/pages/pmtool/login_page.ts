import { type Locator, type Page } from "@playwright/test";
<<<<<<< HEAD
import { DashboardPage } from "./dashboard_page";
=======
import { DashboardPage } from "./dashboard_page.ts";
>>>>>>> origin/main
import { LostPasswordPage } from "./lost_password_page.ts";

export class LoginPage {
  // 1. Identifikace prvků a dalších properties
  private readonly page: Page;
  private readonly url = "https://tredgate.com/pmtool/";
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
<<<<<<< HEAD
  private readonly lostPasswordAnchor: Locator;
=======
  private readonly passwordForgottenAnchor: Locator;
>>>>>>> origin/main

  // 2. Constructor v kterém nastavíme jednotlivé lokátory
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator(".btn");
<<<<<<< HEAD
    this.lostPasswordAnchor = page.locator("//a[@id='forget_password']");
=======
    this.passwordForgottenAnchor = page.locator("#forget_password");
>>>>>>> origin/main
  }

  // 3. Ovládací metody
  // Při vytváření metod doporučím přístup začít s atomickými (malými) metodami s jedním krokem a pak vytvářet sdružující metody
  // Například: typeUsername - jeden krok, login - sdružení více kroků
  // Atomické metody používáme, když danou funkcionalitu testujeme a sdružující metody například pro preconditions jiných testů

  // ! Testovací data NIKDY nedáváme do metod, ale dáváme je do parametru
  async typeUsername(username: string): Promise<LoginPage> {
    await this.usernameInput.fill(username);
    return this;
  }

  async openPmtool(): Promise<LoginPage> {
    await this.page.goto(this.url);
    return this;
  }

  async typePassword(password: string): Promise<LoginPage> {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLogin(): Promise<DashboardPage> {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async login(username: string, password: string): Promise<DashboardPage> {
    await this.typeUsername(username);
    await this.typePassword(password);
    await this.clickLogin();
    return new DashboardPage(this.page);
  }

  async clickPasswordForgotten(): Promise<LostPasswordPage> {
<<<<<<< HEAD
    await this.lostPasswordAnchor.click();
=======
    await this.passwordForgottenAnchor.click();
>>>>>>> origin/main
    return new LostPasswordPage(this.page);
  }
}
