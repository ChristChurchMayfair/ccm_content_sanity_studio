export default {
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
      title: "Roles",
      name: "roles",
      type: "array",
      type: 'array',
      of: [
        {
          type: 'string',
        }
      ]
    }
  ],
  preview: {
      select: {
          title: 'name',
          roles: 'roles'
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