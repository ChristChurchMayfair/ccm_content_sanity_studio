import {defineArrayMember, defineField, defineType} from 'sanity'

export const jobAdvert = defineType({
  title: 'Job Advert',
  name: 'jobadvert',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             .slice(0, 200)
      }
    }),
    defineField({
      title: "Intro Copy",
      name: "introcopy",
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      title: "Apply To",
      name: "applyto",
      type: "reference",
      to: [{ type: "person" }],
    }),
    defineField({
      title: "Application Deadline",
      name: "applicationdeadline",
      type: "date"
    }),
    defineField({
      title: "Interviews Begin",
      name: "interviewsbegin",
      type: "date"
    }),
    defineField({
      title: "Job Profile",
      name: "jobprofile",
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      title: "Attachments",
      name: "attachments",
      type: 'array',
      of: [defineArrayMember({
        title: 'Attachment',
        name: 'attachment',
        type: 'file',
        fields: [
          {
            name: 'description',
            type: 'string',
            title: 'Description',
            options: {
              list: ["Application Form"]
            }
          },
        ]
      })]
    })
  ],
})