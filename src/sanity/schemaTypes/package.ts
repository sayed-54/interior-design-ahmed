import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'package',
  title: 'Packages (الباقات)',
  type: 'document',
  fields: [
    defineField({
      name: 'titleEn',
      type: 'string',
      title: 'Package Name (English)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleAr',
      type: 'string',
      title: 'اسم الباقة (Arabic)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'titleEn' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Package Image (صورة الباقة)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'shortDescriptionEn',
      type: 'text',
      title: 'Short Description (English)',
    }),
    defineField({
      name: 'shortDescriptionAr',
      type: 'text',
      title: 'وصف مختصر (Arabic)',
    }),
    defineField({
      name: 'features',
      type: 'array',
      title: 'Package Features (مميزات الباقة)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'featureEn', type: 'string', title: 'Feature (English)', validation: (Rule) => Rule.required() },
            { name: 'featureAr', type: 'string', title: 'الميزة (Arabic)', validation: (Rule) => Rule.required() }
          ],
          preview: {
            select: {
              title: 'featureEn',
              subtitle: 'featureAr'
            }
          }
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'titleAr',
      media: 'image',
    },
  },
})
