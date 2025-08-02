#!/usr/bin/env node

/**
 * SmartUI URL capture script for LambdaTest
 * This script captures screenshots of URLs using SmartUI CLI
 */

import { execSync } from "child_process";
import { pages } from "../tests/visual/pages.config.js";

// Configuration
const config = {
  projectToken: process.env.SMARTUI_PROJECT_TOKEN,
  buildName: process.env.BUILD_NAME || `Build-${Date.now()}`,
  baseURL: process.env.BASE_URL || "http://localhost:4321",
  configFile: "smartui.json",
};

// Check required environment variables
if (!config.projectToken) {
  console.error(
    "❌ Error: SMARTUI_PROJECT_TOKEN environment variable is required"
  );
  process.exit(1);
}

console.log("🎨 Starting SmartUI screenshot capture...");
console.log(`📊 Build: ${config.buildName}`);
console.log(`🌐 Base URL: ${config.baseURL}`);

// Prepare URLs from pages config
const urls = pages.pages.map((page) => `${config.baseURL}${page.path}`);

console.log(`📸 Capturing ${urls.length} URLs:`, urls);

try {
  // Build SmartUI command
  const command = [
    "npx smartui exec",
    `--config ${config.configFile}`,
    `--projectToken ${config.projectToken}`,
    `--buildName "${config.buildName}"`,
    `-- node -e "console.log('SmartUI URL capture completed')"`,
  ].join(" ");

  // For URL-based capture, use smartui capture command
  for (const url of urls) {
    console.log(`📸 Capturing: ${url}`);
    const captureCommand = [
      "npx smartui capture",
      `"${url}"`,
      `--config ${config.configFile}`,
      `--projectToken ${config.projectToken}`,
      `--buildName "${config.buildName}"`,
    ].join(" ");

    execSync(captureCommand, { stdio: "inherit" });
  }

  console.log("✅ SmartUI capture completed successfully!");
  console.log(`🔗 View results: https://smartui.lambdatest.com`);
} catch (error) {
  console.error("❌ SmartUI capture failed:", error.message);
  process.exit(1);
}
