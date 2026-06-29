import { test, expect } from "@playwright/test";

test("confirm engine matches project", async ({
  page,
  browserName,
}, testInfo) => {
  const expectedEngine: Record<string, string> = {
    chromium: "chromium",
    "mobile-viewport-pixel7": "chromium",
    "mobile-viewport-iphone15pro": "webkit",
  };

  const expected = expectedEngine[testInfo.project.name];
  expect(browserName).toBe(expected);

  const ua = await page.evaluate(() => navigator.userAgent);
  console.log(`[${testInfo.project.name}] UA:`, ua);

  if (expected === "webkit") {
    expect(ua).toContain("AppleWebKit");
    expect(ua).toContain("Safari");
    expect(ua).not.toContain("Chrome");
  } else {
    // Chromium-based projects (desktop or Pixel viewport)
    expect(ua).not.toContain("AppleWebKit/605"); // rules out Safari-style UA leaking in
  }
});
