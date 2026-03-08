import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Article de blog',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre (FR)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleEn', title: 'Titre (EN)', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'author', type: 'string' }),
    defineField({ name: 'mainImage', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', type: 'string', title: 'Alt text' })
    ]}),
    defineField({ name: 'categories', type: 'array', of: [{ type: 'string' }],
      options: { list: ['Tendances', 'Études de cas', 'Guides pratiques', 'Mariage', 'Corporate'] }
    }),
    defineField({ name: 'publishedAt', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'excerpt', title: 'Extrait (FR)', type: 'text', rows: 3 }),
    defineField({ name: 'excerptEn', title: 'Extrait (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Contenu (FR)', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'bodyEn', title: 'Contenu (EN)', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'seo', type: 'object', fields: [
      defineField({ name: 'metaTitle', type: 'string' }),
      defineField({ name: 'metaDescription', type: 'text', rows: 2 }),
    ]}),
  ],
  preview: { select: { title: 'title', media: 'mainImage' } }
})
