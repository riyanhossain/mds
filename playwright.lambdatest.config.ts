import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration for LambdaTest
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results.json' }],
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:4321',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    
    // LambdaTest capabilities
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'light',
    locale: 'en-US',
    timezoneId: 'America/New_York',
    
    // LambdaTest specific
    'LT:Options': {
      platform: 'Windows 10',
      build: process.env.BUILD_NAME || 'Visual Testing Build',
      name: process.env.TEST_NAME || 'Visual Test',
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,
      network: true,
      video: true,
      console: true,
      tunnel: false,
      tunnelName: '',
      geoLocation: '',
      smartUIProjectName: 'mds-visual-testing'
    }
  },
  
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
  ],
});