import {defineArrayMember, defineField, defineType} from 'sanity'

export const servingOpportunity = defineType({
  title: 'Serving Opportunity',
  name: 'servingOpportunity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      title: 'Owners',
      name: 'owners',
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
