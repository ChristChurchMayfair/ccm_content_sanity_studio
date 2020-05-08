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
          role0: 'roles.0.name',
          role1: 'roles.1.name',
          role2: 'roles.2.name',
          role3: 'roles.3.name',
      },
      prepare(selection) {
          const { title, role0, role1, role2, role3 } = selection
          const roles = [role0, role1, role2].filter(Boolean)
          const subtitle = roles.length > 0 ? `${roles.join(', ')}` : ''
          const hasMoreRoles = Boolean(role3)
          return {
              title: title,
              subtitle: hasMoreRoles ? `${subtitle}…` : subtitle
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