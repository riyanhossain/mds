import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = import.meta.env || {
  PUBLIC_SANITY_PROJECT_ID: process.env.PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET: process.env.PUBLIC_SANITY_DATASET,
};

export default defineConfig({
  name: 'default',
  title: 'MDS Dienstleistungen',

  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
