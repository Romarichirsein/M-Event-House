import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Événement',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleEn', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'date', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'endDate', type: 'datetime' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'descriptionEn', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'price', type: 'string' }),
    defineField({ name: 'capacity', type: 'number' }),
    defineField({ name: 'registrationLink', type: 'url' }),
    defineField({ name: 'mainImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'isPast', type: 'boolean', initialValue: false }),
  ],
})
