import { type Locator, type Page, expect } from "@playwright/test";

export class ProjectInfoPage {
  private readonly page: Page;
  readonly projectNameDiv: Locator;
  readonly idDivXPath: Locator;
  readonly startDateTdXPath: Locator;
  readonly dateAddedTdXPath: Locator;
  readonly createdBySpanXPath: Locator;
  readonly statusDivXpath: Locator;
  readonly priorityDivXpath: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectNameDiv = page.locator(".portlet-title .caption");
    this.idDivXPath = page.locator('//th[text()="Status"]/..//div');
    this.startDateTdXPath = page.locator('//th[text()="Start Date"]/../td');
    this.dateAddedTdXPath = page.locator('//th[text()="Date Added"]/../td');
    this.createdBySpanXPath = page.locator(
      '//th[text()="Created By"]/..//span'
    );
    this.statusDivXpath = page.locator('//th[text()="Status"]/..//div');
    this.priorityDivXpath = page.locator('//th[text()="Priority"]/..//div');
  }

  async projectNameHaveText(projectName: string): Promise<ProjectInfoPage> {
    await expect(this.projectNameDiv).toHaveText(projectName);
    return this;
  }

  async startDateHaveText(startDate: string): Promise<ProjectInfoPage> {
    await expect(this.startDateTdXPath).toHaveText(startDate);
    return this;
  }

  async dateAddedHaveText(dateAdded: string): Promise<ProjectInfoPage> {
    await expect(this.dateAddedTdXPath).toContainText(dateAdded);
    return this;
  }

  async createdByHaveText(createdBy: string): Promise<ProjectInfoPage> {
    await expect(this.createdBySpanXPath).toHaveText(createdBy);
    return this;
  }

  async statusHaveText(status: string): Promise<ProjectInfoPage> {
    await expect(this.statusDivXpath).toHaveText(status);
    return this;
  }

  async priorityHaveText(priority: string): Promise<ProjectInfoPage> {
    await expect(this.priorityDivXpath).toHaveText(priority);
    return this;
  }
}
