import { expect, test } from "@playwright/test";

test("Exercise: Asserts API", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );
  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("userId");
  expect(typeof responseBody.active).toBe("number");
  expect(responseBody.username).toBe("petrfifka");
});
