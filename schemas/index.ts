import { SchemaTypeDefinition } from 'sanity'

import {person, role} from './people'
import { sermon, sermonEvent, sermonSeries } from './sermon'

export const schemaTypes: SchemaTypeDefinition[] = [person, role, sermon, sermonEvent, sermonSeries]
