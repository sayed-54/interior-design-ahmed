import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'reservation',
  title: 'Project Reservation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Interested Category',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isRead',
      title: 'Read by Admin',
      type: 'boolean',
      description: 'Check when this reservation has been reviewed',
      initialValue: false,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      isRead: 'isRead',
    },
    prepare({ title, subtitle, isRead }) {
      return {
        title: `${isRead ? '✅' : '📌'} ${title}`,
        subtitle: subtitle || 'General Inquiry',
      }
    },
  },
})
