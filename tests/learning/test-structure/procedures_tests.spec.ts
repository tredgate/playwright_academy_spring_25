import { test } from "@playwright/test";
import { loginAndOpenProjects } from "src/procedures/pmtool_procedures";

test("Using procedure", async ({ page }) => {
  const projectsPage = await loginAndOpenProjects(
    page,
    "pw_skoleni",
    "TEG2023"
  );
  await projectsPage.clickAddProject();
});
