import {defineArrayMember, defineField, defineType} from 'sanity'

export const accomodationSought = defineType({
  title: 'Accomodation Sought',
  name: 'accomodationSought',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The name of the person seeking accomodation',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'contactPreferences',
      title: 'Contact Preferences',
      description: 'How do they prefer to be contacted?',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: [
              {value: 'email', title: 'Email'},
              {value: 'sms', title: 'Text Message'},
              {value: 'whatsapp', title: 'WhatsApp'},
              {value: 'phone', title: 'phone'},
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'requirementDescription',
      title: 'Requirement Description',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'genderPreference',
      title: 'Gender Preference',
      type: 'string',
      options: {
        list: ['Male', 'Female'],
      },
    }),
    defineField({
      name: 'locationPreferences',
      title: 'Location Preferences',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'requiredFrom',
      title: 'Required From',
      type: 'string',
    }),
    defineField({
      name: 'maxBudget',
      title: 'Max Budget',
      type: 'string',
    }),
    defineField({
      name: 'displayUntil',
      title: 'Dislay Until',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      locations: 'locationPreferences',
      requiredFrom: 'requiredFrom',
    },
    prepare(selection) {
      const {title, locations, requiredFrom} = selection
      const suffix = locations.length > 2 ? '…' : ''
      return {
        title: title,
        subtitle: requiredFrom + ' - ' + locations.slice(0, 3).join(', ') + suffix,
      }
    },
  },
})

export const accomodationOffered = defineType({
  title: 'Accomodation Offered',
  name: 'accomodationOffered',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The name of the person seeking accomodation',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'contactPreferences',
      title: 'Contact Preferences',
      description: 'How do they prefer to be contacted?',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: [
              {value: 'email', title: 'Email'},
              {value: 'sms', title: 'Text Message'},
              {value: 'whatsapp', title: 'WhatsApp'},
              {value: 'phone', title: 'phone'},
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'requirementDescription',
      title: 'Requirement Description',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'genderPreference',
      title: 'Gender Preference',
      type: 'string',
      options: {
        list: ['Male', 'Female'],
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'availableFrom',
      title: 'Available From',
      type: 'string',
    }),
    defineField({
      name: 'availableUntil',
      title: 'Available Until',
      type: 'string',
    }),
    defineField({
      name: 'monthlyRent',
      title: 'Monthly Rent',
      type: 'string',
    }),
    defineField({
      name: 'displayUntil',
      title: 'Dislay Until',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      location: 'location',
      availableFrom: 'availableFrom',
    },
    prepare(selection) {
      const {title, location, availableFrom} = selection
      return {
        title: title,
        subtitle: availableFrom + ' - ' + location,
      }
    },
  },
})
