#!/bin/bash

# Script to run visual tests locally with LambdaTest

echo "🎨 Starting local visual regression tests..."

# Check if LambdaTest credentials are set
if [ -z "$LT_USERNAME" ] || [ -z "$LT_ACCESS_KEY" ]; then
    echo "❌ Error: LambdaTest credentials not set!"
    echo "Please set LT_USERNAME, LT_ACCESS_KEY, and SMARTUI_PROJECT_TOKEN environment variables"
    echo ""
    echo "Example:"
    echo "export LT_USERNAME='your_username'"
    echo "export LT_ACCESS_KEY='your_access_key'"
    echo "export SMARTUI_PROJECT_TOKEN='your_project_token'"
    exit 1
fi

# Check if SmartUI project token is set
if [ -z "$SMARTUI_PROJECT_TOKEN" ]; then
    echo "⚠️  Warning: SMARTUI_PROJECT_TOKEN not set!"
    echo "You can create a project and get the token from: https://smartui.lambdatest.com"
fi

# Set build name with timestamp
export BUILD_NAME="local-test-$(date +%Y%m%d-%H%M%S)"
export TEST_NAME="Local Visual Test"

echo "🔧 Configuration:"
echo "   Username: $LT_USERNAME"
echo "   Build: $BUILD_NAME"
echo "   Project Token: ${SMARTUI_PROJECT_TOKEN:0:10}..."

# Choose testing method
echo ""
echo "Choose testing method:"
echo "1) SmartUI URL Capture (Recommended for initial setup)"
echo "2) Playwright + LambdaTest (Full integration test)"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
  1)
    echo "📸 Starting SmartUI URL capture..."
    
    # Build and start server for URL capture
    echo "📦 Building Astro project..."
    npm run build
    
    echo "🚀 Starting preview server..."
    npm run preview &
    SERVER_PID=$!
    
    # Wait for server to start
    sleep 10
    
    # Run SmartUI capture
    BASE_URL=http://localhost:4321 npm run smartui:capture
    
    # Kill the preview server
    kill $SERVER_PID
    ;;
  2)
    echo "🧪 Running Playwright visual tests on LambdaTest..."
    npx playwright test --config=playwright.lambdatest.config.ts
    ;;
  *)
    echo "❌ Invalid choice. Please run the script again and choose 1 or 2."
    exit 1
    ;;
esac

echo "✅ Visual tests completed!"
echo "📊 View results at: https://smartui.lambdatest.com"
echo "🎯 Build name: $BUILD_NAME"