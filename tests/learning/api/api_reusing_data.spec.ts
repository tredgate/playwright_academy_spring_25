import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Reusing Data between API Calls", async ({ request }) => {
  const email = faker.internet.exampleEmail();
  const username = faker.internet.username();
  const password = faker.internet.password();

  const registerResponse = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register",
    {
      data: {
        username,
        password,
        email,
      },
    }
  );
  const registerBody = await registerResponse.json();
  const userId = registerBody.userId;

  const userResponse = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop",
    {
      params: {
        userId,
      },
    }
  );
  const userResponseBody = await userResponse.json();

  expect(userResponseBody.username).toBe(username);
  expect(userResponseBody.email).toBe(email);
  expect(userResponseBody.userId).toBe(userId);
  expect(typeof userResponseBody.createdAt).toBe("string");
  expect(userResponseBody.updatedAt).toBeDefined();
  expect(userResponseBody.active).toBe(1);
});
