// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";

import cloudflare from "@astrojs/cloudflare";

const env = loadEnv(`${process.env.NODE_ENV}`, process.cwd(), "");

export default defineConfig({
  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      useCdn: false,
      studioBasePath: "/studio",
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: cloudflare(),
  env: {
    schema: {
      PUBLIC_SANITY_PROJECT_ID: envField.string({ context: "client", access: "public", optional: true }),
      PUBLIC_SANITY_DATASET: envField.string({ context: "client", access: "public", optional: true }),
    }
  }
});
