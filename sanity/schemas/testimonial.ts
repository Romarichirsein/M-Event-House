import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'content', title: 'Avis (FR)', type: 'text', validation: r => r.required() }),
    defineField({ name: 'contentEn', title: 'Avis (EN)', type: 'text' }),
    defineField({ name: 'rating', type: 'number', validation: r => r.min(1).max(5) }),
    defineField({ name: 'eventType', type: 'string' }),
    defineField({ name: 'image', type: 'image' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'date', type: 'date' }),
  ],
})
