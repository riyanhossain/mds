// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";

import vercel from "@astrojs/vercel";

const env = loadEnv(`${process.env.NODE_ENV}`, process.cwd(), "");

export default defineConfig({
  integrations: [
    sanity({
      projectId:
        process.env.PUBLIC_SANITY_PROJECT_ID || env.PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.PUBLIC_SANITY_DATASET || env.PUBLIC_SANITY_DATASET,
      useCdn: false,
      studioBasePath: "/studio",
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  env: {
    schema: {
      PUBLIC_SANITY_PROJECT_ID: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
      PUBLIC_SANITY_DATASET: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
    },
  },
  output: "server",
  adapter: vercel(),
});
