import { defineField, defineType } from "sanity";

export const service = defineType({
  type: "document",
  name: "service",
  title: "Service",
  fields: [
    defineField({
      type: "string",
      name: "name",
    }),
    defineField({
        type: "number",
        name: "order"
    }),
    defineField({
      type: "string",
      name: "time",
    }),
    defineField({
      type: "string",
      name: "shortDescription",
    }),
    defineField({
      type: "url",
      name: "youtubeStream",
    }),
    defineField({
        type: "url",
        name: "serviceSheet",
      }),
    defineField({
      title: "Description",
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      type: "image",
      name: "image",
    }),
  ],
});
