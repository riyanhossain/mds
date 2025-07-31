import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import imageUrlBuilder from "@sanity/image-url";
import structure from "./sanity/desk/deskStructure";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = import.meta.env || {
  PUBLIC_SANITY_PROJECT_ID: process.env.PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET: process.env.PUBLIC_SANITY_DATASET,
};

export default defineConfig({
  name: "default",
  title: "MDS Dienstleistungen",

  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,

  plugins: [structureTool({ structure, title: "Content" })],

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem) => templateItem.templateId != "settings"
        );
      }
      return prev;
    },
  },

  schema: {
    types: schemaTypes,
  },
});

export function urlFor(source: any) {
  return imageUrlBuilder({
    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: PUBLIC_SANITY_DATASET,
  }).image(source);
}
