# Visual Testing Setup with LambdaTest

This project is configured for visual regression testing using Playwright and LambdaTest SmartUI. The tests automatically run when you push to the `staging` branch or create a pull request targeting `staging`.

## 🚀 Quick Start

### Prerequisites

1. **LambdaTest Account**: Sign up at [LambdaTest](https://www.lambdatest.com/)
2. **Get Credentials**:
   - Go to [LambdaTest Dashboard](https://accounts.lambdatest.com/dashboard)
   - Navigate to Settings > Access Token
   - Copy your Username and Access Key

### GitHub Setup

1. Go to your repository settings on GitHub
2. Navigate to Settings > Secrets and variables > Actions
3. Add these secrets:
   - `LT_USERNAME`: Your LambdaTest username
   - `LT_ACCESS_KEY`: Your LambdaTest access key

### Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set environment variables:

   ```bash
   export LT_USERNAME="your_username"
   export LT_ACCESS_KEY="your_access_key"
   ```

3. Run visual tests locally:
   ```bash
   ./scripts/visual-test-local.sh
   ```

## 📸 How It Works

### Automatic Testing

When you:

- Push code to the `staging` branch
- Create a pull request to `staging`

The workflow will:

1. Build your Astro site
2. Capture screenshots of all configured pages
3. Compare them with the `main` branch baseline
4. Report any visual differences
5. Comment on the PR with results

### Test Configuration

#### Pages to Test

Edit `tests/visual/pages.config.ts` to add pages:

```typescript
export const pages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  // Add more pages...
];
```

#### Viewports

The tests run on multiple viewport sizes:

- Desktop: 1920x1080
- Tablet: 768x1024
- Mobile: 375x667

#### Browsers

LambdaTest tests on:

- Chrome
- Firefox
- Safari
- Edge

## 🧪 Running Tests

### Local Playwright Tests

```bash
# Run all visual tests
npm run test:visual

# Run with UI mode
npx playwright test --ui

# Update snapshots
npx playwright test --update-snapshots
```

### LambdaTest SmartUI Tests

```bash
# Run LambdaTest visual tests
npm run test:visual:lambdatest

# Capture screenshots only
npm run smartui:capture

# Compare with baseline
npm run smartui:compare
```

## 📊 Viewing Results

### GitHub Actions

1. Go to the Actions tab in your repository
2. Click on the workflow run
3. Download artifacts or view logs

### LambdaTest Dashboard

1. Log in to [LambdaTest SmartUI](https://smartui.lambdatest.com)
2. Find your project: `mds-visual-testing`
3. Review visual differences
4. Approve or reject changes

### Pull Request Comments

The bot will automatically comment on PRs with:

- ✅ Pass/fail status
- 🔗 Links to detailed results
- 📊 Build information

## 🛠️ Customization

### Ignore Dynamic Content

Edit `tests/visual/visual-regression.spec.ts` to mask dynamic elements:

```typescript
const dynamicSelectors = [".timestamp", ".visitor-counter", ".random-content"];
```

### Threshold Settings

Adjust sensitivity in `smartui.json`:

```json
"threshold": {
  "errorThreshold": 0.1,  // 0.1% difference allowed
  "ignoreAntialiasing": true,
  "ignoreColors": false
}
```

### Add Custom Tests

Create new test files in `tests/visual/`:

```typescript
import { test, expect } from "@playwright/test";

test("Custom flow test", async ({ page }) => {
  await page.goto("/");
  // Your test steps...
  await expect(page).toHaveScreenshot("custom-test.png");
});
```

## 🔧 Troubleshooting

### Common Issues

1. **Tests failing locally but passing in CI**
   - Ensure same Node version (v22)
   - Clear Playwright cache: `npx playwright install --force`

2. **LambdaTest connection issues**
   - Verify credentials are correct
   - Check firewall settings
   - Ensure stable internet connection

3. **Visual differences on every run**
   - Add dynamic content to `dynamicSelectors`
   - Increase `waitForTimeout` in config
   - Check for animations or lazy loading

### Debug Mode

Run with debug output:

```bash
DEBUG=pw:api npm run test:visual
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [LambdaTest SmartUI Guide](https://www.lambdatest.com/support/docs/smart-visual-regression-testing/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🤝 Support

For issues or questions:

1. Check the troubleshooting section
2. Review GitHub Actions logs
3. Contact LambdaTest support
4. Open an issue in the repository
