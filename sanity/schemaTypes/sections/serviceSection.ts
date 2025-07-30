import { defineType, defineField } from "sanity";

export const serviceSection = defineType({
  name: "serviceSection",
  title: "Service Section",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      type: "string",
      title: "Section ID",
    }),
    defineField({
      name: "heading",
      type: "object",
      title: "Heading",
      fields: [
        {
          name: "headlineColorText",
          type: "string",
          title: "Headline (Color Text)",
        },
        {
          name: "headlineNormalText",
          type: "string",
          title: "Headline (Normal Text)",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "images",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
              validation: (Rule) =>
                Rule.required().min(1).error("At least one image is required"),
            },
          ],
          preview: {
            select: {
              title: "title",
              media: "images.0.asset",
            },
            prepare({ title, media }) {
              return {
                title,
                media,
              };
            },
          },
        },
      ],
      title: "Cards",
    }),
  ],
  preview: {
    select: {
      headlineColorText: "heading.headlineColorText",
      headlineNormalText: "heading.headlineNormalText",
      media: "cards.0.images.0.asset",
    },
    prepare({ headlineColorText, headlineNormalText, media }) {
      return {
        title: `Service Section: ${headlineNormalText ? headlineColorText + " " + headlineNormalText : headlineColorText || ""}`,
        media,
      };
    },
  },
});
