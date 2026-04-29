import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import dotenv from "dotenv";

test("UI - Simple Login Test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto(process.env.BASE_URL!);

  await loginPage.signInLink.click();
  await loginPage.emailInput.fill(process.env.USER_EMAIL!);
  await loginPage.passwordInput.fill(process.env.USER_PASSWORD!);
  await loginPage.signInButton.click();
  await loginPage.userProfileNameLink.click();
  await expect(loginPage.editUserProfileSettings).toBeVisible();
});

test.beforeEach(() => {
  console.log("hook beforeEach");

  test.info().annotations.push({
    type: "Start Time:",
    description: new Date().toISOString(),
  });
});

test.afterEach(() => {
  console.log("hook afterEach");

  test.info().annotations.push({
    type: "End Time:",
    description: new Date().toISOString(),
  });
});
