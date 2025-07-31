import { defineType, defineField } from "sanity";

export const imageGallerySection = defineType({
  name: "imageGallerySection",
  title: "Image Gallery Section",
  type: "object",
  fields: [
    defineField({
      name: "sectionId",
      type: "string",
      title: "Section ID",
    }),
    defineField({
      name: "images",
      type: "array",
      title: "Images",
      of: [
        {
          type: "image",
          title: "Image",
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one image is required"),
    }),
  ],
  preview: {
    select: { title: "images.0.title", media: "images.0" },
    prepare({ media }) {
      return {
        title: `Gallery Images Section`,
        media,
      };
    },
  },
});
