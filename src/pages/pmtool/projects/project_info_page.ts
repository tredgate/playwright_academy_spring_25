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
    await expect(this.dateAddedTdXPath).toHaveText(dateAdded);
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

// TODO: Migrate this from Cypress to Playwright
/*
export class ProjectInfoPage extends HeaderSection {
  constructor(projectId = "") {
    super(`module=items/info&path=21-${projectId}`);
    this.projectNameDiv = ".portlet-title .caption";
    this.idDivXPath = '//th[text()="Status"]/..//div';
    this.startDateTdXPath = '//th[text()="Start Date"]/../td';
    this.dateAddedTdXPath = '//th[text()="Date Added"]/../td';
    this.createdBySpanXPath = '//th[text()="Created By"]/..//span';
    this.statusDivXpath = '//th[text()="Status"]/..//div';
    this.priorityDivXpath = '//th[text()="Priority"]/..//div';
  }

  projectNameHaveText(projectName) {
    cy.get(this.projectNameDiv).should("contain.text", projectName);
    return this;
  }

  startDateHaveText(startDate) {
    cy.xpath(this.startDateTdXPath).should("have.text", startDate);
    return this;
  }

  dateAddedHaveText(dateAdded) {
    cy.xpath(this.dateAddedTdXPath).should("contain.text", dateAdded);
    return this;
  }

  createdByHaveText(createdBy) {
    cy.xpath(this.createdBySpanXPath).should("have.text", createdBy);
    return this;
  }

  statusHaveText(status) {
    cy.xpath(this.statusDivXpath).should("have.text", status);
    return this;
  }

  priorityHaveText(priority) {
    cy.xpath(this.priorityDivXpath).should("have.text", priority);
    return this;
  }
}

*/
