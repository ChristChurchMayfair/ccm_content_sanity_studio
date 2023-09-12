// First, we must import the schema creator
// import createSchema from '@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
// import schemaTypes from 'all:part:@sanity/base/schema-type'

import { accomodationOffered, accomodationSought } from './accomodation'
import { blog } from './blog'
import {person, role} from './people'
import { sermon, sermonSeries, sermonEvent } from './sermon'
import { createSchema } from 'sanity'
import { servingOpportunity } from './serving'
import { notice } from './notices'
import { service } from './services'

const types = [
    person,
    role,
    sermon,
    sermonSeries,
    sermonEvent,
    // blog,
    // accomodationSought,
    // accomodationOffered,
    // servingOpportunity,
    // notice,
    service
  ]

// Then we give our schema to the builder and provide the result to Sanity
export const schema = createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: types
})

export default types