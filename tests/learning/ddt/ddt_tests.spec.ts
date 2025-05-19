import { test } from "@playwright/test";
import newProjectData from "../../../src/assets/ddt/new_project_data.json";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Data Driven Tests", () => {
  // ? do parametru index je přiřazené číslo běhu (0, 1, 2, 3...) v cyklu. My ho budeme potřebovat, abychom vytvořili unikátní názvy testů
  newProjectData.forEach((project, index) => {
    // ? Dynamické vytváření testů, používáme index a project description z JSON. Název bude vypadat například: 1. DDT: Create Project Description
    test(`${index + 1}. DDT: Create Project ${project.description} `, async ({
      page,
    }) => {
      const projectName =
        project.name_prefix + faker.number.int({ max: 99999 });
      const startDate = getStartDate(project.start_date, "YYYY-MM-DD");
      console.log("Vygenerované projectName: " + projectName);
      console.log("Vygenerovaný startDate: " + startDate);

      const loginPage = new LoginPage(page);
      await loginPage
        .openAndLogin("pw_skoleni", "TEG2023")
        .then((dashboard) => dashboard.clickProjects())
        .then((projects) => projects.clickAddProject())
        .then((createProject) => createProject.typeStartDate(startDate))
        .then((createProject) => createProject.typeName(projectName))

        .then((createProject) => createProject.selectPriority(project.priority))
        .then((createProject) => createProject.selectStatus(project.status))
        .then((createProject) => createProject.clickSave())
        .then((tasks) => tasks.clickProjectInfo())
        .then((projectInfo) =>
          projectInfo.startDateHaveText(
            getStartDate(project.start_date, "DD/MM/YYYY")
          )
        )
        .then((projectInfo) =>
          projectInfo.createdByHaveText("Treducation Gate")
        )
        .then((projectInfo) => projectInfo.priorityHaveText(project.priority))
        .then((projectInfo) => projectInfo.statusHaveText(project.status))
        .then((projectInfo) => projectInfo.projectNameHaveText(projectName));
    });
  });
});

function getStartDate(startDate: string, dateFormat: string): string {
  switch (startDate) {
    case "today":
      return dayjs().format(dateFormat);
    case "yesterday":
      return dayjs().subtract(1, "day").format(dateFormat);
    case "tomorrow":
      return dayjs().add(1, "day").format(dateFormat);
    default:
      throw new Error("Invalid start date");
  }
}
