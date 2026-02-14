import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
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
      name: 'servicesLinks',
      title: 'Services Links',
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
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string' },
            { name: 'url', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'localizedString',
    }),
  ],
  preview: {
    select: {
      title: 'copyrightText.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Footer Settings',
      }
    },
  },
})
