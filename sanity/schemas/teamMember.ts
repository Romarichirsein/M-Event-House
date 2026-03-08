import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Membre de l\'équipe',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio (FR)', type: 'text' }),
    defineField({ name: 'bioEn', title: 'Bio (EN)', type: 'text' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', type: 'number', title: 'Ordre d\'affichage' }),
  ],
})
