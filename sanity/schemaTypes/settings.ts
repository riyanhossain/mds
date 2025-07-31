import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  preview: {
    prepare() {
      return { title: "MDS Settings" };
    },
  },
  groups: [
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
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
