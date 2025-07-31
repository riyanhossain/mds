import { defineType, defineField } from "sanity";
import components from "./components";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    { name: "meta", title: "Meta Information" },
    { name: "header", title: "Header" },
    { name: "sections", title: "Sections" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // Meta Information
    defineField({
      name: "pageName",
      title: "Page Name",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "pageName",
        maxLength: 96,
      },
      group: "meta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      group: "meta",
    }),

    // Sections
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "sections",
      of: [...components],
    }),

  ],
});
