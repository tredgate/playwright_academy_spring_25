import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Reusing Data in API", async ({ request }) => {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const username = faker.internet.username();

  const regResponse = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        email,
        password,
        username,
      },
    }
  );
  const regResponseBody = await regResponse.json();
  const userId = regResponseBody.userId;

  const userResponse = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop",
    {
      params: {
        userId,
      },
    }
  );
  const userResponseBody = await userResponse.json();
  expect(userResponseBody.userId).toBe(userId);
  expect(userResponseBody.email).toBe(email);
  expect(userResponseBody.username).toBe(username);
  expect(typeof userResponseBody.createdAt).toBe("string");
  expect(userResponseBody.updatedAt).toBeDefined();
  expect(userResponseBody.active).toBe(1);
});
