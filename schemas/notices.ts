import {defineArrayMember, defineField, defineType} from 'sanity'

export const notice = defineType({
  title: 'Notice',
  name: 'notice',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      title: 'Call To Action Links',
      name: 'callToActionLinks',
      type: 'array',
      description: 'Links for people to click to follow up.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Link Title',
            },
            {
              name: 'link',
              type: 'url',
              title: 'URL',
            },
          ],
        }),
      ],
    }),
    defineField({
      title: 'Contacts',
      name: 'contacts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'person'}],
        },
      ],
    }),
    defineField({
      name: "expiryDate",
      title: "Expiry Date",
      description: "The date, after which, this notice won't be shown",
      type: "date"
    })
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title,
      }
    },
  },
})
