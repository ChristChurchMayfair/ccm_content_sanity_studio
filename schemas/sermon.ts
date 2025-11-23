/*
  name: String!
  preachedAt: DateTime!
  url: String! @isUnique
  duration: Int!
  series: Series @relation(name: "SermonOnSeries")
  speakers: [Speaker!]! @relation(name: "SermonOnSpeaker")
  event: Event @relation(name: "SermonOnEvent")
  passage: String



type Series @model {
  id: ID! @isUnique
  name: String! @isUnique
  subtitle: String
  sermons: [Sermon!]! @relation(name: "SermonOnSeries")
  image3x2Url: String
}

  */

import { SanityDocument, Slug, SlugSourceContext, StringRule, defineField, defineType, validation } from "sanity";

const TimestampRule = (Rule: StringRule) =>
  Rule.custom((timestamp) => {
    if (typeof timestamp === "undefined") {
      return true; // Allow undefined values, remove if the field is required
    }
    const parts = timestamp.split(":");
    if (parts.length !== 3) {
      return "Not a valid timestamp - should match HH:MM:SS"; // Error message goes here
    }
    const regex = /(\d+:)([0-5]?\d:)([0-5]?\d)/gi; // Regex pattern goes here
    if (regex.test(timestamp)) {
      return true;
    } else {
      return "Not a valid timestamp - should match HHHHHH:MM:SS"; // Error message goes here
    }
  });

export const seriesType = defineType({
  title: "Series Type",
  name: "seriesType",
  type: "document",
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "text",
    }),
  ],
});

export const sermonEvent = defineType({
  title: "Sermon Event",
  name: "sermonEvent",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
  ],
});

export const sermonSeries = defineType({
  title: "Sermon Series",
  name: "sermonSeries",
  type: "document",
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
    }),
    defineField({
      title: "Subtitle",
      name: "subtitle",
      type: "string",
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc: SanityDocument, context: SlugSourceContext) =>`${doc.name}${doc.subtitle !== null ? "-" + doc.subtitle : ""}`
      }
    }),
    defineField({
      title: "Image Url",
      name: "imageUrl",
      type: "string",
    }),
    defineField({
      title: "Series Type",
      name: "seriesType",
      type: "reference",
      to: [{ type: "seriesType" }],
    }),
    defineField({
      name: "seasonNumber",
      title: "Season Number",
      type: "slug",
      description: "season number, lower numbers are older. Leave empty for non-seasonal shows (bonus episodes)",
      validation: Rule => Rule.custom<Slug>(number => {
        // Allow empty values for non-seasonal shows
        if (!number?.current) {
          return true;
        }
        const value = parseInt(number.current, 10);
        if (isNaN(value)) {
          return "Number must be a valid integer";
        }
        if (value <= 0) {
          return "Number must be a positive, non-zero integer";
        }
        return true;
      })
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "subtitle",
    },
  },
});

export const sermon = defineType({
  title: "Sermon",
  name: "sermon",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "PreachedAt",
      name: "preachedAt",
      type: "datetime",
    }),
    defineField({
      title: "URL",
      name: "url",
      type: "url",
    }),
    defineField({
      title: "durationInSeconds",
      name: "durationInSeconds",
      type: "number",
    }),
    defineField({
      title: "Passages",
      name: "passages",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      title: "Event",
      name: "event",
      type: "reference",
      to: [{ type: "sermonEvent" }],
    }),
    defineField({
      title: "Series",
      name: "series",
      type: "reference",
      to: [{ type: "sermonSeries" }],
    }),
    defineField({
      title: "Speakers",
      name: "speakers",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
        },
      ],
    }),
    defineField({
      name: "youtubeVideoId",
      title: "YouTube Video ID",
      type: "string",
    }),
    defineField({
      name: "youtubeVideoSermonStartTimestamp",
      title: "Sermon Start Timestamp",
      type: "string",
      validation: TimestampRule,
      description: "This is the timestamp in the youtube video where the reading starts"
    }),
    defineField({
      name: "youtubeVideoSermonEndTimestamp",
      title: "Sermon End Timestamp",
      type: "string",
      validation: TimestampRule,
      description: "This is the timestamp in the youtube video where the sermon ends starts. Use the end of the preachers closing prayer."
    }),
    defineField({
        name: "sermonNumber",
        title: "Sermon Number",
        type: "number",
        description: "This is the number of the sermon within the series. First sermon is 1, and so on"
      }),
  ],
  // preview: {
  //     select: {
  //         title: 'title',
  //         seriesName: 'series.name'
  //     },
  //     prepare(selection: { title: any; seriesName: any }) {
  //         const { title, seriesName } = selection
  //         return {
  //             title: title,
  //             subtitle: `Series: ${seriesName}`
  //         }
  //     }
  // },
  orderings: [
    {
      title: "Preached Date, New to Old",
      name: "preachDateDesc",
      by: [{ field: "preachedAt", direction: "desc" }],
    },
  ],
});
