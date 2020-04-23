export default {
    title: "Blog Entry",
    name: "blog_entry",
    type: "document",
    fields: [
        {
            title: "Title",
            name: "title",
            type: "string"
        },
        {
            title: 'Author',
            name: 'author',
            type: 'reference',
            to: [{ type: 'person' }]
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title'
            },
        },
        {
            title: 'Text',
            name: 'text',
            type: 'array',
            of: [{ type: 'block' }]
        }
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            dateCreated: '_createdAt'
        },
        prepare(selection) {
            const { title, author, dateCreated } = selection
            return {
                title: title,
                subtitle: `${author} - ${dateCreated.split('T')[0]}`
            }
        }
    },
}