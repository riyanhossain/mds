import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import structure from "./sanity/desk/deskStructure";
import { client } from "@/lib/client.sanity";

export default defineConfig({
  name: "default",
  title: "MDS Dienstleistungen",

  projectId: client.config().projectId ?? "",
  dataset: client.config().dataset ?? "",

  plugins: [structureTool({ structure, title: "Content" })],

  schema: {
    types: schemaTypes,
  },
});
