// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";

import vercel from "@astrojs/vercel";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

export default defineConfig({
  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID ?? "dzwl1s75",
      dataset: env.PUBLIC_SANITY_DATASET ?? "production",
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
