import { defineField, defineType } from "sanity"

export default defineType({
    title: "Blog Entry",
    name: "blog_entry",
    type: "document",
    fields: [
        defineField({
            title: "Title",
            name: "title",
            type: "string"
        }),
        defineField({
            title: 'Author',
            name: 'author',
            type: 'reference',
            to: [{ type: 'person' }]
        }),
        defineField({
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title'
            },
        }),
        defineField({
            title: 'Text',
            name: 'text',
            type: 'array',
            of: [{ type: 'block' }]
        })
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
})