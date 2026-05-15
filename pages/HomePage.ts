import { type Locator, type Page, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly userProfileNameLink: Locator;
  readonly newArticleLink: Locator;
  readonly settings: Locator;
  readonly signUpLink: Locator;
  readonly yourFeedLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Define Locators
    this.newArticleLink = page.getByRole("link", { name: "New Article" });
    this.settings = page.getByRole("link", { name: "Settings" });
    this.userProfileNameLink = page.locator("li.nav-item").getByRole("link", {
      name: process.env.USER_NAME,
    });
    this.signUpLink = page.getByRole("link", { name: "Sign up" });
    this.yourFeedLink = page.getByRole("link", { name: "Your Feed" });
  }

  async goto() {
    const url = process.env.BASE_URL;
    if (!url)
      throw new Error("BASE_URL is not defined in environment variables");
    await this.page.goto(process.env.BASE_URL!);
  }

  async verifyUserIsLoggedIn(userName: string) {
    await expect(this.newArticleLink).toBeEnabled();
    await expect(this.settings).toBeEnabled();
    await expect(
      this.page.locator("li.nav-item").getByRole("link", {
        name: userName,
      }),
    ).toBeEnabled();
  }

  async openUserProfile() {
    await expect(this.userProfileNameLink).toBeEnabled();
    await this.userProfileNameLink.click();
  }

  async openSignUpPage() {
    await expect(this.signUpLink).toBeEnabled();
    await this.signUpLink.click();
  }

  async openUserFeed() {
    // there is a hydration issue here so we use Promise.all
    await expect(this.yourFeedLink).toBeVisible();
    await expect(this.yourFeedLink).toBeEnabled();

    await Promise.all([
      this.page.waitForURL("**/my-feed"),
      this.yourFeedLink.click(),
    ]);
  }
}
