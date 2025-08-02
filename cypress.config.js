import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://mds-weld.vercel.app",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
