import { test, expect } from "@playwright/test";
import { UserResponseSchema } from "../../schemas/api.user.schema";

test.describe("API Login - positive cases", () => {
  test("API - Login - Correct email and correct password", async ({
    request,
  }) => {
    const loginURL = `${process.env.API_BASE_URL}/users/login`;

    const response = await request.post(loginURL, {
      data: {
        user: {
          email: process.env.USER_EMAIL!,
          password: process.env.USER_PASSWORD!,
        },
      },
    });

    const body: unknown = await response.json();

    expect(response.status()).toBe(200);

    const { user } = UserResponseSchema.parse(body);
    expect(user.token).toBeDefined();
    expect(user.email).toBe(process.env.USER_EMAIL!);
  });
});
