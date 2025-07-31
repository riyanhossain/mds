import { createClient } from "@sanity/client";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = import.meta.env || {
  PUBLIC_SANITY_PROJECT_ID: process.env.PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET: process.env.PUBLIC_SANITY_DATASET,
};

export const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  useCdn: true,
});
