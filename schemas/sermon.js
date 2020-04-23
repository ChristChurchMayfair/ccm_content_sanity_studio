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

export let sermonEvent = {
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
}

export let sermonSeries = {
    title: "Sermon Series",
    name: "sermonSeries",
    type: "document",
    fields: [
        {
            title: "Name",
            name: "name",
            type: "string"
        },
        {
            title: "Subtitle",
            name: "subtitle",
            type: "string"
        },
        {
            title: "Image Url",
            name: "imageUrl",
            type: "string"
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'subtitle'
        }
    }
}

export let sermon = {
    title: "Sermon",
    name: "sermon",
    type: "document",
    fields: [
        {
            title: "Title",
            name: "title",
            type: "string"
        },
        {
            title: "PreachedAt",
            name: "preachedAt",
            type: "datetime"
        },
        {
            title: "URL",
            name: "url",
            type: "url"
        },
        {
            title: "durationInSeconds",
            name: "durationInSeconds",
            type: "number"
        },
        {
            title: "Passages",
            name: "passages",
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            title: "Event",
            name: "event",
            type: "reference",
            to: [
                { type: "sermonEvent" }
            ]
        },
        {
            title: "Series",
            name: "series",
            type: "reference",
            to: [
                { type: "sermonSeries" }
            ]
        },
        {
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
        }
    ],
    preview: {
        select: {
            title: 'title',
            seriesName: 'series.name'
        },
        prepare(selection) {
            const { title, seriesName } = selection
            return {
                title: title,
                subtitle: `Series: ${seriesName}`
            }
        }
    },
    orderings: [
        {
          title: 'Preached Date, New to Old',
          name: 'preachDateDesc',
          by: [
            {field: 'preachedAt', direction: 'desc'}
          ]
        }
    ]
}