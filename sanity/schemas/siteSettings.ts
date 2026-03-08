import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({ name: 'heroTagline', type: 'object', fields: [
      { name: 'fr', type: 'string' },
      { name: 'en', type: 'string' }
    ]}),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'whatsapp', type: 'string' }),
    defineField({ name: 'address', type: 'text' }),
    defineField({ name: 'socialLinks', type: 'array', of: [
      {
        type: 'object',
        fields: [
          { name: 'platform', type: 'string' },
          { name: 'url', type: 'url' }
        ]
      }
    ]}),
  ],
})
