---
name: sanity-cms
description: Intégrer Sanity v3 dans un projet Next.js 14 App Router — schemas, GROQ queries, Sanity Studio embarqué, image CDN, ISR, preview mode, PortableText. Utiliser ce skill pour tout projet utilisant Sanity comme CMS headless.
---

# SKILL : Sanity CMS v3 — Next.js 14 App Router

## Installation
```bash
npm create sanity@latest  # initialiser le projet Sanity
npm install next-sanity @sanity/image-url @portabletext/react
npm install -D @sanity/types
```

## Structure de fichiers
```
/sanity/
  schemas/
    post.ts
    portfolio.ts
    event.ts
    testimonial.ts
    teamMember.ts
    siteSettings.ts
    index.ts        # export all schemas
  lib/
    client.ts       # sanity client
    image.ts        # urlFor helper
    queries.ts      # GROQ queries
  sanity.config.ts  # Sanity Studio config
/app/
  studio/
    [[...index]]/
      page.tsx      # Studio embarqué Next.js
  api/
    revalidate/
      route.ts      # on-demand revalidation webhook
```

## Configuration client
```typescript
// sanity/lib/client.ts
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // '2024-01-01'
  useCdn: true, // false pour preview/draft
})

// Pour les mutations (Studio)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})
```

## Variables d'environnement (.env.local)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=xxxx
SANITY_API_WRITE_TOKEN=xxxx        # pour webhook revalidation
SANITY_WEBHOOK_SECRET=xxxx
```

## Schemas obligatoires (M Event House)

### post.ts (Blog)
```typescript
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
```

### portfolio.ts (Réalisations)
```typescript
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
```

### event.ts (Événements calendrier)
```typescript
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
    defineField({ name: 'price', type: 'string' }), // ex: "Gratuit" ou "50€/pers"
    defineField({ name: 'capacity', type: 'number' }),
    defineField({ name: 'registrationLink', type: 'url' }),
    defineField({ name: 'mainImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'isPast', type: 'boolean', initialValue: false }),
  ],
})
```

### testimonial.ts
```typescript
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
```

## GROQ Queries helpers
```typescript
// sanity/lib/queries.ts
import { client } from './client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// Posts
export async function getAllPosts(locale = 'fr') {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, titleEn, slug, mainImage, categories, publishedAt, excerpt, excerptEn
    }
  `, {}, { next: { revalidate: 60 } })
}

export async function getPostBySlug(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      ..., "related": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0..2] { title, slug, mainImage, publishedAt }
    }
  `, { slug }, { next: { revalidate: 60 } })
}

// Portfolio
export async function getFeaturedPortfolio() {
  return client.fetch(`
    *[_type == "portfolio" && featured == true] | order(date desc)[0..5] {
      _id, title, slug, featuredImage, eventType, date, location
    }
  `, {}, { next: { revalidate: 60 } })
}

export async function getAllPortfolio() {
  return client.fetch(`
    *[_type == "portfolio"] | order(date desc) {
      _id, title, titleEn, slug, featuredImage, images, eventType, date, location, description, descriptionEn, challenge, result, tags
    }
  `, {}, { next: { revalidate: 60 } })
}

// Testimonials
export async function getFeaturedTestimonials() {
  return client.fetch(`
    *[_type == "testimonial" && featured == true] | order(date desc)[0..5] {
      _id, name, role, content, contentEn, rating, eventType, image
    }
  `, {}, { next: { revalidate: 60 } })
}

// Events
export async function getUpcomingEvents() {
  const now = new Date().toISOString()
  return client.fetch(`
    *[_type == "event" && date > $now] | order(date asc) {
      _id, title, titleEn, slug, date, endDate, location, price, capacity, mainImage
    }
  `, { now }, { next: { revalidate: 60 } })
}
```

## Sanity Studio embarqué Next.js
```typescript
// app/studio/[[...index]]/page.tsx
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

## PortableText Renderer
```tsx
// components/PortableTextRenderer.tsx
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/queries'

const components = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || ''}
          className="w-full rounded-lg"
          loading="lazy"
        />
      </div>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-[--accent-gold]">{children}</strong>,
    link: ({ value, children }: any) => (
      <a href={value.href} className="text-[--accent-gold] underline hover:no-underline" target={value.blank ? '_blank' : undefined}>
        {children}
      </a>
    ),
  },
}

export function PortableTextRenderer({ value }: { value: any }) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={value} components={components} />
    </div>
  )
}
```

## On-demand revalidation (webhook Sanity)
```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string; slug?: { current: string } }>(
      req,
      process.env.SANITY_WEBHOOK_SECRET
    )
    if (!isValidSignature) return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })

    const { _type, slug } = body
    switch (_type) {
      case 'post': revalidatePath('/blog'); if (slug) revalidatePath(`/blog/${slug.current}`); break
      case 'portfolio': revalidatePath('/portfolio'); break
      case 'event': revalidatePath('/events'); break
      default: revalidatePath('/')
    }
    return NextResponse.json({ revalidated: true })
  } catch (err) {
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
```

## next.config.ts — images Sanity
```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' }
    ]
  }
}
```

## Checklist déploiement
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` défini
- [ ] `NEXT_PUBLIC_SANITY_DATASET` = "production"
- [ ] `SANITY_API_READ_TOKEN` pour ISR (si dataset privé)
- [ ] Webhook Sanity configuré vers `/api/revalidate`
- [ ] CORS Sanity autorisé pour le domaine de prod
- [ ] Studio accessible à `/studio` (protéger via Sanity auth)
- [ ] Images Sanity CDN dans `remotePatterns` next.config.ts