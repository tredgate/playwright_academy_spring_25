//api_tests.spec.ts
// složka: learning/api

import { test } from "@playwright/test";

test.describe("API Tests", () => {
  test("GET Request", async ({ request }) => {
    await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/train");
  });

  test("GET Request with Parameter", async ({ request }) => {
    await request.get("https://tegb-backend-877a0b063d29.herokuapp.com/eshop", {
      params: {
        userId: 3,
      },
    });
  });

  test("GET Request with Header", async ({ request }) => {
    await request.get(
      "https://tegb-backend-877a0b063d29.herokuapp.com/train/header",
      {
        headers: {
          train: "hlavicka",
        },
      }
    );
  });

  test("POST Request with Body", async ({ request }) => {
    await request.post(
      "https://tegb-backend-877a0b063d29.herokuapp.com/train/body",
      {
        data: {
          stringProperty: "test",
          numberProperty: 123,
          booleanProperty: true,
        },
      }
    );
  });
});
/*

Vytvořte nový test, který provolá POST request s body:
Složka: tests/exercises
Test: api_request_body_exercise.spec.ts
Url: https://tegb-backend-877a0b063d29.herokuapp.com/eshop/register
Metoda: POST
Body:
{
    "username": "Kristopher.Howe",
    "password": "123456",
    "email": "Addison_Emard@example.net"
}

Data pro body vygeneruj pomocí faker.

*/
