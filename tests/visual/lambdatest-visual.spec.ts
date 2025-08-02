import { test } from '@playwright/test';
import { pages } from './pages.config';

// SmartUI SDK integration for LambdaTest
const smartUISDK = require('@lambdatest/smartui-cli');

const pagesToTest = pages || [
  { name: 'Home', path: '/' },
];

test.describe('LambdaTest SmartUI Visual Tests', () => {
  pagesToTest.forEach(({ name, path }) => {
    test(`Capture ${name} page for visual comparison`, async ({ page }) => {
      // Navigate to the page
      await page.goto(path);
      
      // Wait for the page to fully load
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000); // Additional wait for dynamic content
      
      // Capture screenshot using LambdaTest SmartUI
      await smartUISDK.smartuiSnapshot(page, `${name}-page`);
      
      // Test different viewport sizes
      const viewports = [
        { name: 'Desktop', width: 1920, height: 1080 },
        { name: 'Tablet', width: 768, height: 1024 },
        { name: 'Mobile', width: 375, height: 667 }
      ];
      
      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.waitForTimeout(500); // Wait for responsive layout to adjust
        await smartUISDK.smartuiSnapshot(page, `${name}-${viewport.name}`);
      }
    });
  });
  
  // Test critical user flows
  test('Capture critical user flows', async ({ page }) => {
    // Example: Test navigation flow
    await page.goto('/');
    await smartUISDK.smartuiSnapshot(page, 'Homepage-Initial');
    
    // Add more user flow tests as needed
    // Example: Click on navigation items, forms, etc.
  });
});