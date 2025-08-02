#!/bin/bash

# Script to run visual tests locally with LambdaTest

echo "🎨 Starting local visual regression tests..."

# Check if LambdaTest credentials are set
if [ -z "$LT_USERNAME" ] || [ -z "$LT_ACCESS_KEY" ]; then
    echo "❌ Error: LambdaTest credentials not set!"
    echo "Please set LT_USERNAME and LT_ACCESS_KEY environment variables"
    exit 1
fi

# Build the project
echo "📦 Building Astro project..."
npm run build

# Start preview server in background
echo "🚀 Starting preview server..."
npm run preview &
SERVER_PID=$!

# Wait for server to start
sleep 5

# Run visual tests
echo "🧪 Running visual tests..."
BASE_URL=http://localhost:4321 npm run test:visual

# Run LambdaTest SmartUI capture
echo "📸 Capturing screenshots with SmartUI..."
npx smartui capture ./screenshots --config=smartui.json \
  --urls "http://localhost:4321/" \
  --buildName "local-test-$(date +%Y%m%d-%H%M%S)"

# Kill the preview server
kill $SERVER_PID

echo "✅ Visual tests completed!"
echo "📊 View results at: https://smartui.lambdatest.com"