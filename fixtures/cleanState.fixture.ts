import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";

type CleanStateFixtures = {
  homePage: HomePage;
  registerPage: RegisterPage;
};

export const test = base.extend<CleanStateFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.openSignUpPage();
    await use(homePage);
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});

export { expect } from "@playwright/test";
