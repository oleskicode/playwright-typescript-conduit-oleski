import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect(page).toHaveTitle(/Playwright/);
});

test.beforeEach(() => {
  console.log("HOOK-beforeEach");

  test.info().annotations.push({
    type: "Start Time:",
    description: new Date().toISOString(),
  });
});

test.afterEach(() => {
  console.log("HOOK-afterEach");

  test.info().annotations.push({
    type: "End Time:",
    description: new Date().toISOString(),
  });
});
