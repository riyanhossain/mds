// /schemas/sections/heroSection.js
import { defineType, defineField, defineArrayMember } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      type: "string",
      title: "Section ID",
    }),
    defineField({
      name: "backgroundImage",
      type: "image",
      title: "Background Image",
      validation: (Rule) => Rule.required(),
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
    defineField({ name: "subheading", type: "string", title: "Subheading" }),
    defineField({
      name: "button",
      type: "object",
      fields: [
        {
          name: "text",
          type: "string",
          title: "Button Text",
          validation: (Rule) => Rule.required(),
        },
        { name: "url", type: "string", title: "Button URL" },
      ],
    }),
  ],
  preview: {
    select: {
      headlineColorText: "heading.headlineColorText",
      headlineNormalText: "heading.headlineNormalText",
      media: "backgroundImage",
    },
    prepare({ headlineColorText, headlineNormalText, media }) {
      const title = `${headlineColorText ? headlineColorText + " " : ""}${headlineNormalText || ""}`;
      return {
        title: `Hero Section: ${title}`,
        media,
      };
    },
  },
});
