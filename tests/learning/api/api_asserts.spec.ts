//api_asserts.spec.ts
// složka: tests/learning/api

import { expect, test } from "@playwright/test";

test.describe("API Asserts", () => {
  test("Assert response status 200", async ({ request }) => {
    const response = await request.get(
      "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
    );
    expect(response.status()).toBe(200);
  });

  test("Assert Response Header", async ({ request }) => {
    const response = await request.get(
      "https://tegb-backend-877a0b063d29.herokuapp.com/train"
    );
    // ? Vytahuje hlavičky z response
    const headers = response.headers();
    // ? Ziskáme konkrétní hlavičku
    const contentType = headers["content-type"];
    expect(contentType).toBe("application/json; charset=utf-8");
    // ? Kontroluje část hlavičky
    expect(contentType).toContain("application/json");
  });

  test("Response Body Asserts", async ({ request }) => {
    const response = await request.get(
      "https://tegb-backend-877a0b063d29.herokuapp.com/train"
    );
    // ? Vytažení body z response
    const responseBody = await response.json();

    // * Kontroly
    // ? Kontroly obsahu
    expect(responseBody.id).toBe(1);
    expect(responseBody.message).toBe("TEG#B Training GET request successful");

    // ? Kontrola existence property
    expect(responseBody).toHaveProperty("timestamp");

    // ? Kontrola typu property (number, string, boolean)
    expect(typeof responseBody.id).toBe("number");
  });
});
