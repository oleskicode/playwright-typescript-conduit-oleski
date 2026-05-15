import { type Locator, type Page, expect } from "@playwright/test";

export class UserFeedPage {
  readonly page: Page;
  readonly noArticlesHereYet: Locator;
  readonly articleLoadingIndicator: Locator;

  constructor(page: Page) {
    this.page = page;

    // Define Locators
    this.noArticlesHereYet = page.getByText("No articles are here... yet.");
    this.articleLoadingIndicator = page.locator(
      '[data-qa-id="article-loading-indicator"]',
    );
  }

  async verifyUserFeedPageIsEmpty() {
    await expect(this.articleLoadingIndicator).toBeHidden();
    await expect(this.noArticlesHereYet).toBeVisible();
  }
}
