import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'packageReservation',
  title: 'Package Reservations (حجوزات الباقات)',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name (اسم العميل)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone (رقم الهاتف)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email (البريد الإلكتروني)',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'city',
      title: 'City (المدينة)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'selectedPackage',
      title: 'Selected Package (الباقة المختارة)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message (ملاحظات)',
      type: 'text',
    }),
    defineField({
      name: 'isViewed',
      title: 'Viewed (تمت المراجعة)',
      type: 'boolean',
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
      title: 'customerName',
      subtitle: 'selectedPackage',
      isViewed: 'isViewed',
    },
    prepare({ title, subtitle, isViewed }) {
      return {
        title: `${isViewed ? '✅' : '📩'} ${title}`,
        subtitle: subtitle,
      }
    },
  },
})
