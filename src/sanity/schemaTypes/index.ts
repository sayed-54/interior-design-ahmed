import { type SchemaTypeDefinition } from 'sanity'
import settings from './settings'
import hero from './hero'
import project from './project'
import service from './service'
import about from './about'
import footer from './footer'
import { localizedString } from './localizedString'
import { localizedText } from './localizedText'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [settings, hero, project, service, about, footer, localizedString, localizedText],
}
