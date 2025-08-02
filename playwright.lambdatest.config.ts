import { defineConfig, devices } from "@playwright/test";

const isLambdaTest = process.env.LT_USERNAME && process.env.LT_ACCESS_KEY;

/**
 * Playwright configuration for LambdaTest
 */
export default defineConfig({
  testDir: "./tests/visual",
  timeout: 60000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [["html"], ["list"], ["json", { outputFile: "test-results.json" }]],

  use: {
    baseURL: process.env.BASE_URL || "http://localhost:4321",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",

    // Common settings
    viewport: { width: 1920, height: 1080 },
    colorScheme: "light",
    locale: "en-US",
    timezoneId: "America/New_York",

    // LambdaTest connection
    ...(isLambdaTest && {
      connectOptions: {
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
          JSON.stringify({
            browserName: "Chrome",
            browserVersion: "latest",
            "LT:Options": {
              platform: "Windows 10",
              build: process.env.BUILD_NAME || "Visual Testing Build",
              name: process.env.TEST_NAME || "Visual Test",
              user: process.env.LT_USERNAME,
              accessKey: process.env.LT_ACCESS_KEY,
              network: true,
              video: true,
              console: true,
              smartUI: true,
              projectToken: process.env.SMARTUI_PROJECT_TOKEN,
            },
          })
        )}`,
      },
    }),
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(isLambdaTest ? {} : { channel: "chrome" }),
      },
    },
  ],

  // Only run web server locally
  ...(!isLambdaTest && {
    webServer: {
      command: "npm run build && npm run preview",
      url: "http://localhost:4321",
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },
  }),
});
