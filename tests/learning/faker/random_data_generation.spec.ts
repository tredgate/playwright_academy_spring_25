// random_data_generation.spec.ts

import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Testing data generation by Faker", async ({ page }) => {
  await page.goto("/"); // Děláme jen kvůli tomu, abychom se vyhli ESLint chybě, Playwright page v tomto souboru nepotřebujeme
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.exampleEmail({ firstName, lastName });
  const password = faker.internet.password();
  const address = faker.location.streetAddress();

  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log(`Address: ${address}`);
});
