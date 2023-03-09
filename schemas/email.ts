// import {defineType, defineField, SchemaTypeDefinition} from 'sanity'

// export const email: SchemaTypeDefinition = defineType({
//     title: "Email",
//     name: "emailCustom",
//     type: "document",
//     fields: [
//         defineField({
//             title: "Title",
//             name: "title",
//             type: "string"
//         }),
//         defineField({
//             title: 'Send At',
//             name: 'sendAt',
//             type: 'datetime',
//             options: {
//                 timeStep: 60
//             }
//         }),
//         defineField({
//             title: 'Author',
//             name: 'author',
//             type: 'reference',
//             to: [{ type: 'person' }]
//         }),
//         defineField({
//             title: 'Body',
//             name: 'body',
//             type: 'array',
//             of: [{ type: 'block' }]
//         })
//     ],
//     preview: {
//         select: {
//           title: 'title',
//           sendDate: 'sendAt'
//         },
//         prepare: 
//         // prepare(selection: { title: any; sendDate: any }) {
//         //     const {title, sendDate} = selection
//         //     return {
//         //         title: title,
//         //         subtitle: sendDate.split("T")[0]
//         //     }
//         // }
//       }
// })