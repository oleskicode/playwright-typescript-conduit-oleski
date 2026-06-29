import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  // Global setup:
  globalSetup: "./setup/auth.setup.ts",
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    baseURL: process.env.BASE_URL,
    storageState: `.auth/user.json`,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // NOTE: no real Android or iOS device/OS is involved in either
    // project below — there's no Appium, no emulator, no device farm.
    // Playwright's device presets just set viewport size, user-agent,
    // and touch emulation on top of a desktop browser engine. Used here
    // purely to test responsive layout at mobile-like screen sizes.

    // Chromium with a Pixel 7-sized viewport/UA (engine stays Chromium)
    {
      name: "mobile-viewport-pixel7",
      use: {
        ...devices["Pixel 7"],
      },
    },
    // Playwright's bundled WebKit at iPhone 15 Pro viewport/UA.
    // This is the desktop WebKit build, not real iOS Safari —
    // close, but known to diverge on some engine-specific behavior.
    {
      name: "mobile-viewport-iphone15pro",
      use: {
        ...devices["iPhone 15 Pro"],
      },
    },
  ],
});
