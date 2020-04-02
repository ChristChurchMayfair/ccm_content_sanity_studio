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
    ]
}