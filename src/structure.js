import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Content')
    .items([
        S.listItem()
        .title("People")
        .child(S.list()
            .title("People")
            .items([
                S.listItem()
                .title("People")
                .schemaType("person")
                .child(S.documentTypeList('person')
                    .title("People")),
                S.listItem()
                    .title("Roles")
                    .schemaType("role")
                    .child(S.documentTypeList('role')
                        .title("Roles"))
            ])
        ),
        S.listItem()
        .title("Sermons")
        .child(S.list()
            .title("Sermons")
            .items([
                S.listItem()
                .title("Sermons")
                .schemaType("sermon")
                .child(S.documentTypeList('sermon')
                    .title("Sermons")),
                S.listItem()
                    .title("Series")
                    .schemaType("sermonSeries")
                    .child(S.documentTypeList('sermonSeries')
                        .title("Series")),
                S.listItem()
                    .title("Events")
                    .schemaType("sermonEvent")
                    .child(S.documentTypeList('sermonEvent')
                        .title("Events"))
            ])
        ),
        ...S.documentTypeListItems().filter(listItem => !['person',"role","sermon","sermonSeries","sermonEvent"].includes(listItem.getId()))
        ]
    )