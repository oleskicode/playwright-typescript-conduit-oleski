import { test, expect } from "@playwright/test";

test("confirm engine is webkit", async ({ page, browserName }) => {
  // browserName comes from Playwright's test fixtures directly
  expect(browserName).toBe("webkit");

  // Cross-check from inside the page itself
  const ua = await page.evaluate(() => navigator.userAgent);
  console.log("UA:", ua);
  expect(ua).toContain("AppleWebKit");
  expect(ua).toContain("Safari");
  expect(ua).not.toContain("Chrome"); // rule out a Chromium UA override
});
