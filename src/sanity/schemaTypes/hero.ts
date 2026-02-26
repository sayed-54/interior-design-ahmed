import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section (القسم الرئيسي)',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'localizedString',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'localizedText',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image (Parallax)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'headline.en',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero Section',
        media: media,
      }
    },
  },
})
