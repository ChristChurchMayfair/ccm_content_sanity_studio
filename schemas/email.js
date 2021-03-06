export default {
    title: "Email",
    name: "emailCustom",
    type: "document",
    fields: [
        {
            title: "Title",
            name: "title",
            type: "string"
        },
        {
            title: 'Send At',
            name: 'sendAt',
            type: 'datetime',
            options: {
                timestep: 60
            }
        },
        {
            title: 'Author',
            name: 'author',
            type: 'reference',
            to: [{ type: 'person' }]
        },
        {
            title: 'Body',
            name: 'body',
            type: 'array',
            of: [{ type: 'block' }]
        }
    ],
    preview: {
        select: {
          title: 'title',
          sendDate: 'sendAt'
        },
        prepare(selection) {
            const {title, sendDate} = selection
            return {
                title: title,
                subtitle: sendDate.split("T")[0]
            }
        }
      }
}