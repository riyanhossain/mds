import { test } from "@playwright/test";
import { pages } from "./pages.config";

const pagesToTest = pages || [{ name: "Home", path: "/" }];

// Configure LambdaTest capabilities
const capabilities = {
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
    smartUIProjectName:
      process.env.SMARTUI_PROJECT_NAME || "mds-visual-testing",
    projectToken: process.env.SMARTUI_PROJECT_TOKEN || "",
  },
};

test.describe("LambdaTest SmartUI Visual Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Set up LambdaTest connection if running on LambdaTest
    if (process.env.LT_USERNAME && process.env.LT_ACCESS_KEY) {
      // Add SmartUI hooks
      await page.addInitScript(() => {
        (window as any).smartUI = true;
      });
    }
  });

  pagesToTest.forEach(({ name, path }) => {
    test(`Capture ${name} page for visual comparison`, async ({ page }) => {
      // Navigate to the page
      await page.goto(path);

      // Wait for the page to fully load
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000); // Additional wait for dynamic content

      // Take SmartUI screenshot
      await page.evaluate((screenshotName) => {
        if ((window as any).smartUI) {
          (window as any).lambdatest_action = JSON.stringify({
            action: "smartui.takeScreenshot",
            arguments: { screenshotName: screenshotName },
          });
        }
      }, `${name}-page`);

      // Test different viewport sizes
      const viewports = [
        { name: "Desktop", width: 1920, height: 1080 },
        { name: "Tablet", width: 768, height: 1024 },
        { name: "Mobile", width: 375, height: 667 },
      ];

      for (const viewport of viewports) {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await page.waitForTimeout(1000); // Wait for responsive layout to adjust

        // Take viewport-specific screenshot
        await page.evaluate((screenshotName) => {
          if ((window as any).smartUI) {
            (window as any).lambdatest_action = JSON.stringify({
              action: "smartui.takeScreenshot",
              arguments: { screenshotName: screenshotName },
            });
          }
        }, `${name}-${viewport.name}`);
      }
    });
  });

  // Test critical user flows
  test("Capture critical user flows", async ({ page }) => {
    // Example: Test navigation flow
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.evaluate((screenshotName) => {
      if ((window as any).smartUI) {
        (window as any).lambdatest_action = JSON.stringify({
          action: "smartui.takeScreenshot",
          arguments: { screenshotName: screenshotName },
        });
      }
    }, "Homepage-Initial");

    // Add more user flow tests as needed
    // Example: Click on navigation items, forms, etc.
  });
});
