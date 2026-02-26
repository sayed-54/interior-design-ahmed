import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services (الخدمات)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (Lucide)',
      type: 'string',
      description: 'The name of the Lucide icon to use (e.g., Compass, Home, Layers)',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled Service',
      }
    },
  },
})
