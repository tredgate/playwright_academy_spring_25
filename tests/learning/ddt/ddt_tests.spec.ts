import { test } from "@playwright/test";
import newProjectData from "../../../src/assets/new_project_data.json";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";

test.describe("Data Driven Tests", () => {
  // ! Index musíme zadat, abychom zajistili unikátní název testu (bez něj by nám testy spadly, protože se testy v rámci jednoho describe musí jmenovat unikátně). project.description může být duplicitní, proto musíme přidat další unikátní identifikátor (index).
  newProjectData.forEach((project, index) => {
    test(`${index + 1}. DDT:Create project ${project.description}`, async ({
      page,
    }) => {
      const projectName =
        project.name_prefix + faker.number.int({ max: 99999 });
      console.log(projectName);
      const startDate = getStartDate(project.start_date, "YYYY-MM-DD");
      console.log(
        `Project start date from JSON: ${project.start_date}, generated date: ${startDate}`
      );

      const loginPage = new LoginPage(page);
      await loginPage
        .openAndLogin("pw_skoleni", "TEG2023")
        .then((dashboard) => dashboard.clickProjects())
        .then((projects) => projects.clickAddProject())
        .then((addProject) => addProject.typeName(projectName))
        .then((addProject) => addProject.typeStartDate(startDate))
        .then((addProject) => addProject.selectPriority(project.priority))
        .then((addProject) => addProject.selectStatus(project.status))
        .then((addProject) => addProject.clickSave())
        .then((projectTasks) => projectTasks.clickProjectInfo())
        .then((projectInfo) => projectInfo.projectNameHaveText(projectName))
        .then((projectInfo) =>
          projectInfo.startDateHaveText(
            getStartDate(project.start_date, "DD/MM/YYYY")
          )
        )
        .then((projectInfo) => projectInfo.priorityHaveText(project.priority))
        .then((projectInfo) => projectInfo.statusHaveText(project.status))
        .then((projectInfo) =>
          projectInfo.createdByHaveText("Treducation Gate")
        );
    });
  });
});

function getStartDate(startDate: string, dateFormat: string): string {
  switch (startDate) {
    case "today":
      //získej dnešní datum s formátem: yyyy-mm-dd
      return dayjs().format(dateFormat);
    case "tomorrow":
      //získej zítřejší datum s formátem: yyyy-mm-dd
      return dayjs().add(1, "days").format(dateFormat);
    case "yesterday":
      //získej včerejší datum s formátem: yyyy-mm-dd
      return dayjs().subtract(1, "days").format(dateFormat);
    default:
      //toto je scénář, který se vykonná, pokud není zadáno nic z výše uvedeného
      //vrátíme chybu, že nebylo zadáno platné datum
      throw new Error("Invalid start date");
  }
}
