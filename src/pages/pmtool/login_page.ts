import { test, expect, type Locator, type Page } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";
import { LostPasswordPage } from "./lost_password_page.ts";

export class LoginPage {
  // 1. Identifikace prvků a dalších properties
  private readonly page: Page;
  private readonly url = "https://tredgate.com/pmtool/";
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly passwordForgottenAnchor: Locator;
  private readonly pageHeader: Locator;
  private readonly loginForm: Locator;

  // 2. Constructor v kterém nastavíme jednotlivé lokátory
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator(".btn");
    this.passwordForgottenAnchor = page.locator("#forget_password");
    this.pageHeader = page.locator("h3.form-title");
    this.loginForm = page.locator(".content-login");
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
    await this.passwordForgottenAnchor.click();
    return new LostPasswordPage(this.page);
  }

  // ? Alternativní názvy metody: assertPageHeaderText, pageHeaderShouldHaveText
  async pageHeaderHasText(headerText: string): Promise<LoginPage> {
    await expect(this.pageHeader).toHaveText(headerText);
    return this;
  }

  async openAndLogin(
    username: string,
    password: string
  ): Promise<DashboardPage> {
    await test.step("Otevření Pmtool a přihlášení", async () => {
      await this.openPmtool().then((login) => login.login(username, password));
    });
    return new DashboardPage(this.page);
  }

  async loginFormVisualCheck(): Promise<LoginPage> {
    await expect(this.loginForm).toHaveScreenshot("login_form.png");
    return this;
  }
}
