# Visual Testing with Percy

This project uses Percy for visual regression testing to compare visual changes between branches.

## How It Works

Percy automatically compares visual snapshots between your feature branch and the main branch to detect visual regressions.

### Automatic Branch Comparison

- **Main Branch**: Serves as the baseline for all visual comparisons
- **Feature Branches**: Are compared against the main branch baseline
- **Pull Requests**: Automatically show visual diffs in the Percy dashboard

## Configuration

The CI pipeline is configured to:

1. **Build the project** with your changes
2. **Start the development server** to serve your application
3. **Run Cypress tests** that take Percy snapshots
4. **Compare snapshots** against the main branch baseline
5. **Report results** in the Percy dashboard and GitHub PR

### Environment Variables

Make sure these secrets are set in your GitHub repository:

- `PERCY_TOKEN`: Your Percy project token
- `PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `PUBLIC_SANITY_DATASET`: Your Sanity dataset name

## Running Tests Locally

### Prerequisites

```bash
npm install
```

### Run Visual Tests

```bash
# Run tests without Percy (faster for development)
npm run test:visual

# Run tests with Percy snapshots (requires PERCY_TOKEN)
PERCY_TOKEN=your_token_here npm run percy:exec

# Open Cypress test runner for debugging
npm run test:visual:open
```

### Local Percy Setup

1. Install Percy CLI: `npm install -g @percy/cli`
2. Get your project token from Percy dashboard
3. Set environment variable: `export PERCY_TOKEN=your_token_here`

## Viewing Results

1. **Percy Dashboard**: View visual diffs at [percy.io](https://percy.io)
2. **GitHub PR**: Percy bot will comment with build status and link to review
3. **CI Logs**: Check GitHub Actions for detailed test output

## Best Practices

### Snapshot Naming

- Use descriptive names: `Homepage - Desktop`, `Login Form - Mobile`
- Include viewport/state info: `Dashboard - Logged in - Tablet`

### Reducing False Positives

- Hide dynamic content (timestamps, loading states)
- Disable animations in Percy snapshots
- Use consistent test data
- Wait for content to load before taking snapshots

### Configuration Files

- `.percy.yml`: Percy configuration (widths, CSS, etc.)
- `cypress.config.js`: Cypress configuration
- `cypress/e2e/visual.cy.js`: Visual test definitions

## Troubleshooting

### Common Issues

1. **Server not ready**: Increase wait time in CI
2. **Font loading**: Ensure web fonts are loaded before snapshots
3. **Dynamic content**: Add Percy CSS to hide changing elements
4. **Viewport inconsistencies**: Use explicit viewport sizing

### Debugging Steps

1. Check Percy build logs in dashboard
2. Review Cypress test output in CI
3. Run tests locally with `npm run test:visual:open`
4. Compare local snapshots with CI environment
