import {
  test as base,
  expect,
  APIRequestContext,
  request as playwrightRequest,
} from "@playwright/test";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

type MyFixtures = {
  authToken: string;
  authenticatedRequest: APIRequestContext;
};

// Helper function to fetch the authentication token.
export async function getAuthTokenFn(
  requestContext: APIRequestContext,
): Promise<string> {
  const baseURL = process.env.API_BASE_URL;

  if (!baseURL) {
    throw new Error("API_BASE_URL is not defined in the .env variables.");
  }
  const loginURL = `${baseURL}/users/login`;
  const response = await requestContext.post(loginURL, {
    data: {
      user: {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD,
      },
    },
  });

  expect(response.ok()).toBeTruthy();

  const responseBody = await response.json();
  const token = responseBody.user.token;
  expect(token).toBeDefined();

  return token;
}

export const test = base.extend<MyFixtures>({
  // Use raw token if needed
  authToken: async ({ request }, use) => {
    // Get the token
    const token = await getAuthTokenFn(request);
    // Pass the token to the test
    await use(token);
  },

  authenticatedRequest: async ({ authToken }, use) => {
    // New context with authentication
    const authenticatedContext = await playwrightRequest.newContext({
      extraHTTPHeaders: {
        Authorization: `Token ${authToken}`,
      },
    });

    // Pass the authenticated context to the test
    await use(authenticatedContext);

    // Clean up
    await authenticatedContext.dispose();
  },
});

export { expect };
