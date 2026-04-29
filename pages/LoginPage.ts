import { type Locator, type Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly signInLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly userProfileNameLink: Locator;
  readonly editUserProfileSettings: Locator;

  constructor(page: Page) {
    this.page = page;

    // Define Locators
    this.signInLink = page.getByRole("link", { name: " Sign in" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.userProfileNameLink = page.getByRole("link", {
      name: process.env.USER_NAME,
    });
    this.editUserProfileSettings = page.getByRole("link", {
      name: " Edit Profile Settings",
    });
  }
}
