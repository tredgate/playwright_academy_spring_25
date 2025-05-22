import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { UserApi } from "../../../src/api/tegb/user_api.ts";

test("Register and Login via API Objects", async ({ request }) => {
  const email = faker.internet.exampleEmail();
  const username = faker.internet.username();
  const password = faker.internet.password();

  const api = new UserApi(request);

  const registerResponse = await api.registerUser(username, password, email);
  const loginResponse = await api.successLogin(username, password);

  // ? Testy mohou být přesunuty do API objektů

  const registerResponseBody = await registerResponse.json();
  expect(registerResponseBody.username).toBeDefined();

  const loginResponseBody = await loginResponse.json();
  expect(loginResponseBody.access_token).toBeDefined();
});
