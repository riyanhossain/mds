import { test, expect } from '@playwright/test';
import { pages } from './pages.config';

// List of pages to test - you can expand this based on your routes
const pagesToTest = pages || [
  { name: 'Home', path: '/' },
  // Add more pages as needed
];

// Test each page for visual regression
pagesToTest.forEach(({ name, path }) => {
  test.describe(`Visual Regression - ${name}`, () => {
    test(`should match visual snapshot for ${name} page`, async ({ page }) => {
      // Navigate to the page
      await page.goto(path);
      
      // Wait for all images and content to load
      await page.waitForLoadState('networkidle');
      
      // Wait for any animations to complete
      await page.waitForTimeout(1000);
      
      // Hide dynamic content that might change between tests
      // Add selectors for elements you want to hide (dates, counters, etc.)
      const dynamicSelectors = [
        // Example: '.timestamp', '.visitor-counter'
      ];
      
      for (const selector of dynamicSelectors) {
        const elements = await page.$$(selector);
        for (const element of elements) {
          await element.evaluate(el => el.style.visibility = 'hidden');
        }
      }
      
      // Take full page screenshot
      await expect(page).toHaveScreenshot(`${name.toLowerCase()}-fullpage.png`, {
        fullPage: true,
        animations: 'disabled',
        mask: dynamicSelectors.map(selector => page.locator(selector)),
        maxDiffPixels: 100,
        threshold: 0.2
      });
      
      // Take viewport screenshot
      await expect(page).toHaveScreenshot(`${name.toLowerCase()}-viewport.png`, {
        fullPage: false,
        animations: 'disabled',
        mask: dynamicSelectors.map(selector => page.locator(selector)),
        maxDiffPixels: 100,
        threshold: 0.2
      });
    });
    
    // Test responsive views
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 }
    ];
    
    viewports.forEach(({ name: viewportName, width, height }) => {
      test(`should match visual snapshot for ${name} page on ${viewportName}`, async ({ page }) => {
        // Set viewport
        await page.setViewportSize({ width, height });
        
        // Navigate to the page
        await page.goto(path);
        
        // Wait for all content to load
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        
        // Take screenshot
        await expect(page).toHaveScreenshot(`${name.toLowerCase()}-${viewportName}.png`, {
          fullPage: false,
          animations: 'disabled',
          maxDiffPixels: 100,
          threshold: 0.2
        });
      });
    });
  });
});