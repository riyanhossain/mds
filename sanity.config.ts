import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import structure from "./sanity/desk/deskStructure";
import { vercelWidget } from "sanity-plugin-dashboard-widget-vercel";
import { dashboardTool } from "@sanity/dashboard";

export default defineConfig({
  name: "default",
  title: "MDS Dienstleistungen",

  projectId: "dzwl1s75",
  dataset: "production",

  plugins: [
    structureTool({ structure, title: "Content" }),
    dashboardTool({
      widgets: [vercelWidget()],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
