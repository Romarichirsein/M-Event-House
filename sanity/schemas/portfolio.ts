import { defineField, defineType } from 'sanity'

export const portfolio = defineType({
  name: 'portfolio',
  title: 'Réalisation',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleEn', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'eventType', type: 'string',
      options: { list: ['Mariage', 'Corporate', 'Surprise', 'Traiteur', 'Décoration', 'Anniversaire', 'Autre'] }
    }),
    defineField({ name: 'date', type: 'date' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'featuredImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'description', title: 'Description (FR)', type: 'text' }),
    defineField({ name: 'descriptionEn', title: 'Description (EN)', type: 'text' }),
    defineField({ name: 'challenge', title: 'Défi/Contexte (FR)', type: 'text' }),
    defineField({ name: 'result', title: 'Résultat (FR)', type: 'text' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
  ],
})
