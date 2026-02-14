import { type SchemaTypeDefinition } from 'sanity'
import settings from './settings'
import hero from './hero'
import project from './project'
import service from './service'
import about from './about'
import footer from './footer'
import contactMessage from './contactMessage'
import reservation from './reservation'
import legal from './legal'
import { localizedString } from './localizedString'
import { localizedText } from './localizedText'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [settings, hero, project, service, about, footer, contactMessage, reservation, legal, localizedString, localizedText],
}
