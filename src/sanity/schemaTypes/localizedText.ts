import { defineType, defineField } from 'sanity'

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'text',
    }),
  ],
})
