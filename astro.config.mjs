// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";

import vercel from "@astrojs/vercel";

// Load environment variables - prioritize process.env for CI
const getEnvVar = (key) => {
  const value = process.env[key];
  if (value) {
    console.log(`✅ Found ${key}:`, value);
    return value;
  }

  // Try loadEnv as fallback for local development
  const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
  const fallbackValue = env[key];
  if (fallbackValue) {
    console.log(`⚡ Fallback ${key}:`, fallbackValue);
    return fallbackValue;
  }

  console.error(`❌ Missing ${key} - check your environment variables!`);
  return undefined;
};

const projectId = getEnvVar("PUBLIC_SANITY_PROJECT_ID");
const dataset = getEnvVar("PUBLIC_SANITY_DATASET");

console.log("🚀 Final config - projectId:", projectId);
console.log("🚀 Final config - dataset:", dataset);

if (!projectId || !dataset) {
  throw new Error(
    "Missing required Sanity environment variables. Please set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET"
  );
}

export default defineConfig({
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: false,
      studioBasePath: "/studio",
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: vercel(),
});
