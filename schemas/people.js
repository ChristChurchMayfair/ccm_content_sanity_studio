export let person = {
  title: "Person",
  name: "person",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string"
    },
    {
      title: "Email",
      name: "email",
      type: "string"
    },
    {
      title: 'Roles',
      name: 'roles',
      type: 'array',
      of: [
          {
              type: 'reference',
              to: [
                  { type: 'role' },
              ]
          }
      ]
  }
  ],
  preview: {
      select: {
          title: 'name',
          roles: 'roles.names'
      },
      prepare(selection) {
          const { title, roles } = selection
          return {
              title: title,
              subtitle: roles ? roles.join(", ") : ""
          }
      }
  },
}

export let role = {
  title: "Role",
  name: "role",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string"
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
          source: 'name'
      }
    }
  ]
}