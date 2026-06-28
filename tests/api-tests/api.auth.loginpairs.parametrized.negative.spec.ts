import { test, expect } from "@playwright/test";
import { ErrorResponseSchema } from "../../schemas/api.user.schema";

type InvalidLoginCase = {
  scenario: string;
  email: string;
  password: string;
};

const invalidLoginCases: InvalidLoginCase[] = [
  {
    scenario: "API - Login - Invalid email and invalid password",
    email: "invalidemail",
    password: "wrongpassword",
  },
  {
    scenario: "API - Login - Correct email and incorrect password",
    email: process.env.USER_EMAIL!,
    password: process.env.USER_PASSWORD! + "123",
  },
  {
    scenario: "API - Login - Incorrect email and correct password",
    email: process.env.USER_EMAIL! + "abc",
    password: process.env.USER_PASSWORD!,
  },
];

test.describe("API Login - negative cases", () => {
  for (const loginCase of invalidLoginCases) {
    test(`${loginCase.scenario}`, async ({ request }) => {
      const loginURL = `${process.env.API_BASE_URL}/users/login`;

      const response = await request.post(loginURL, {
        data: {
          user: {
            email: loginCase.email,
            password: loginCase.password,
          },
        },
      });

      const body: unknown = await response.json();

      expect(response.status()).not.toBe(200);
      expect(response.ok()).toBe(false);

      const { errors } = ErrorResponseSchema.parse(body);
      expect(errors).toMatchObject({ "email or password": "is invalid" });
    });
  }
});
