import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section (من نحن)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'year',
      title: 'Year Started',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'About Section',
        media: media,
      }
    },
  },
})
