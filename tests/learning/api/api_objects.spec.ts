import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { UserApi } from "../../../src/api/user_api.ts";

test.describe("API Objects", () => {
  test("Register and Login via API Objects", async ({ request }) => {
    // * Příprava testovacích dat (pomocí faker)
    const username = faker.internet.username();
    const password = faker.internet.password();
    const email = faker.internet.email();

    // * Vytvoření instance UserApi
    const api = new UserApi(request);
    // * Registrace uživatele
    const registerResponse = await api.registerUser(username, password, email);
    // * Přihlášení uživatele
    const loginResponse = await api.loginUser(username, password);

    // * Testy registrace a přihlášení
    // * I testy mohou být přesunuty do API objektů
    expect(registerResponse.status()).toBe(201);
    expect(loginResponse.status()).toBe(201);

    const registerResponseBody = await registerResponse.json();
    const registerUserId = registerResponseBody.userId;
    expect(registerUserId).toBeDefined();

    const loginResponseBody = await loginResponse.json();
    const accessToken = loginResponseBody.access_token;
    expect(accessToken).toBeDefined();
    expect(typeof accessToken).toBe("string");
  });
});
