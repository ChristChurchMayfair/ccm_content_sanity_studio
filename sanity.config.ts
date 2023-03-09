import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {RobotIcon} from '@sanity/icons'
import {dashboardTool} from '@sanity/dashboard'
import {netlifyWidget} from 'sanity-plugin-dashboard-widget-netlify'

export default defineConfig({
  title: 'Christ Church Mayfair Content',
  subtitle: "Content for CCM's online presence",

  projectId: 'ip162aeb',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('People')
              .child(
                S.list()
                  .title('People')
                  .items([
                    S.listItem()
                      .title('People')
                      .schemaType('person')
                      .child(S.documentTypeList('person').title('People')),
                    S.listItem()
                      .title('Roles')
                      .schemaType('role')
                      .child(S.documentTypeList('role').title('Roles')),
                  ])
              ),
            S.listItem()
              .title('Sermons')
              .child(
                S.list()
                  .title('Sermons')
                  .items([
                    S.listItem()
                      .title('Sermons')
                      .schemaType('sermon')
                      .child(S.documentTypeList('sermon').title('Sermons')),
                    S.listItem()
                      .title('Series')
                      .schemaType('sermonSeries')
                      .child(S.documentTypeList('sermonSeries').title('Series')),
                    S.listItem()
                      .title('Events')
                      .schemaType('sermonEvent')
                      .child(S.documentTypeList('sermonEvent').title('Events')),
                  ])
              ),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !['person', 'role', 'sermon', 'sermonSeries', 'sermonEvent'].includes(
                  listItem.getId() ?? ''
                )
            ),
          ]),
    }),
    visionTool(),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: 'Netlify Deploy',
          sites: [
            {
              title: 'CCM RSS (Podcasts)',
              apiId: '2342b2c3-124a-4113-9a7d-6cdc0f6254b5',
              buildHookId: '5e9e290359b432019b242692',
              name: 'ccmrss',
            },
          ],
        }),
      ],
    }),
  ],

  icon: RobotIcon,

  schema: {
    types: schemaTypes,
  },
})
