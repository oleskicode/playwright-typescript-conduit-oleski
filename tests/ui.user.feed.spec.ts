import { HomePage } from "../pages/HomePage";
import { test } from "../fixtures/baseTest";
import { UserFeedPage } from "../pages/UserFeedPage";

test.describe("User Feed", () => {
  test("should show empty message for a Feed without Subscriptions", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const userFeedPage = new UserFeedPage(page);

    await homePage.goto();
    await homePage.verifyUserIsLoggedIn(process.env.USER_NAME!);
    await homePage.openUserFeed();
    await userFeedPage.verifyUserFeedPageIsEmpty();
  });
});
