import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Exercise: post request with body", async ({ request }) => {
  const username = faker.internet.username();
  const email = faker.internet.exampleEmail();

  await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username,
        password: "123456",
        email,
      },
    }
  );
});
