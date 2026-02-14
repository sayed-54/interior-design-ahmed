import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legal',
  title: 'Legal Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'privacyPolicy',
      title: 'Privacy Policy',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'localizedString' }),
        defineField({ name: 'lastUpdated', type: 'localizedString' }),
        defineField({
          name: 'sections',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'title', type: 'localizedString' }),
              defineField({ name: 'content', type: 'localizedText' }),
            ]
          }]
        })
      ]
    }),
    defineField({
      name: 'termsOfUse',
      title: 'Terms of Use',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'localizedString' }),
        defineField({ name: 'lastUpdated', type: 'localizedString' }),
        defineField({
          name: 'sections',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'title', type: 'localizedString' }),
              defineField({ name: 'content', type: 'localizedText' }),
            ]
          }]
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Legal Content Configuration'
      }
    }
  }
})
