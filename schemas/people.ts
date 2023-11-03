import {defineArrayMember, defineField, defineType} from 'sanity'

export const person = defineType({
  title: 'Person',
  name: 'person',
  type: 'document',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      title: 'Job Title',
      name: 'jobTitle',
      type: 'string',
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'string',
    }),
    defineField({
      title: 'Public Phone Number',
      name: 'phone',
      type: 'string',
    }),
    defineField({
      title: 'Roles',
      name: 'roles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'role'}],
        }),
      ],
    }),
    defineField({
      title: 'Bio',
      name: 'bio',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      title: 'Headshot',
      name: 'headshot',
      type: 'image',
      options: {
        hotspot: true, // <-- Defaults to false
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      role0: 'roles.0.name',
      role1: 'roles.1.name',
      role2: 'roles.2.name',
      role3: 'roles.3.name',
    },
    prepare: (value, options) => {
      const {title, role0, role1, role2, role3} = value
      const roles = [role0, role1, role2].filter(Boolean)
      const subtitle = roles.length > 0 ? `${roles.join(', ')}` : ''
      const hasMoreRoles = Boolean(role3)
      return {
        title: title,
        subtitle: hasMoreRoles ? `${subtitle}…` : subtitle,
      }
    },
  },
})

export const role = defineType({
  title: 'Role',
  name: 'role',
  type: 'document',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
  ],
})
