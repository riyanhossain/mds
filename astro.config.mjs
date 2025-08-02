// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";

import vercel from "@astrojs/vercel";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

// Debug environment variables
console.log("🔍 Debug - NODE_ENV:", process.env.NODE_ENV);
console.log(
  "🔍 Debug - process.env.PUBLIC_SANITY_PROJECT_ID:",
  process.env.PUBLIC_SANITY_PROJECT_ID
);
console.log(
  "🔍 Debug - env.PUBLIC_SANITY_PROJECT_ID:",
  env.PUBLIC_SANITY_PROJECT_ID
);

const projectId =
  process.env.PUBLIC_SANITY_PROJECT_ID || env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || env.PUBLIC_SANITY_DATASET;

console.log("🔍 Debug - Final projectId:", projectId);
console.log("🔍 Debug - Final dataset:", dataset);

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
