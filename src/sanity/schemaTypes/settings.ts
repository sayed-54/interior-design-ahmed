import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'localizedString' },
            { name: 'href', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color (Dark)',
      type: 'string',
      initialValue: '#2A2520',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color (Soft Beige)',
      type: 'string',
      initialValue: '#D6C7BB',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color (Gold)',
      type: 'string',
      initialValue: '#C5A17A',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color (Light Cream)',
      type: 'string',
      initialValue: '#F0ECE6',
    }),
     defineField({
      name: 'warmBrown',
      title: 'Warm Brown',
      type: 'string',
      initialValue: '#524A44',
    }),
    defineField({
      name: 'overlayGradient',
      title: 'Overlay Gradient',
      type: 'string',
      initialValue: 'linear-gradient(to bottom, rgba(42,37,32,0.7), rgba(42,37,32,0.9))',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'footerBackgroundImage',
      title: 'Footer Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle.en',
      media: 'logo',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Site Settings',
        media: media,
      }
    },
  },
})
