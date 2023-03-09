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

import { defineField, defineType } from "sanity";

export let sermonEvent = defineType({
    title: "Sermon Event",
    name: "sermonEvent",
    type: "document",
    fields: [
        {
            title: "Name",
            name: "name",
            type: "string"
        }
    ]
})

export let sermonSeries = defineType({
    title: "Sermon Series",
    name: "sermonSeries",
    type: "document",
    fields: [
        defineField({
            title: "Name",
            name: "name",
            type: "string"
        }),
        defineField({
            title: "Subtitle",
            name: "subtitle",
            type: "string"
        }),
        defineField({
            title: "Image Url",
            name: "imageUrl",
            type: "string"
        })
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'subtitle'
        }
    }
})

export let sermon = defineType({
    title: "Sermon",
    name: "sermon",
    type: "document",
    fields: [
        defineField({
            title: "Title",
            name: "title",
            type: "string"
        }),
        defineField({
            title: "PreachedAt",
            name: "preachedAt",
            type: "datetime"
        }),
        defineField({
            title: "URL",
            name: "url",
            type: "url"
        }),
        defineField({
            title: "durationInSeconds",
            name: "durationInSeconds",
            type: "number"
        }),
        defineField({
            title: "Passages",
            name: "passages",
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            title: "Event",
            name: "event",
            type: "reference",
            to: [
                { type: "sermonEvent" }
            ]
        }),
        defineField({
            title: "Series",
            name: "series",
            type: "reference",
            to: [
                { type: "sermonSeries" }
            ]
        }),
        defineField({
            title: 'Speakers',
            name: 'speakers',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        { type: 'person' },
                    ]
                }
            ]
        })
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
          title: 'Preached Date, New to Old',
          name: 'preachDateDesc',
          by: [
            {field: 'preachedAt', direction: 'desc'}
          ]
        }
    ]
})