import { defineType, defineField } from "sanity";

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
        source: "metaTitle",
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
    // Header
    defineField({
      name: "header",
      title: "Header",
      type: "object",
      group: "header",
      fields: [
        defineField({
          name: "logo",
          title: "Logo",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "navigation",
          title: "Navigation",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string" },
                { name: "url", type: "string" },
              ],
            },
          ],
        }),
      ],
    }),
    // Sections
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "sections",
      of: [
        {
          type: "heroSection",
        },
        {
          type: "imageGallerySection",
        },
        {
          type: "serviceSection",
        },
        {
          type: "contactSection",
        },
      ],
    }),
    // Footer
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({
          name: "logo",
          title: "Logo",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "navigation",
          title: "Navigation",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string" },
                { name: "url", type: "string" },
              ],
            },
          ],
        }),
        defineField({
          name: "copyrightText",
          title: "Copyright Text",
          type: "string",
        }),
      ],
    }),
  ],
});
