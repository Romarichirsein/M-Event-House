---
name: nextjs-multipage-premium
description: Construire un site Next.js 14 App Router multi-pages premium avec next-intl (i18n FR/EN), next-themes (dark/light), Framer Motion transitions de pages, système de design tokens CSS, Resend pour emails, et architecture scalable. Utiliser ce skill pour tout site Next.js 14 premium multi-pages avec internationalisation.
---

# SKILL : Next.js 14 Multi-Pages Premium (App Router + i18n + Themes)

## Structure de fichiers obligatoire
```
app/
  [locale]/               # FR/EN routing
    layout.tsx            # providers: i18n + theme + motion
    page.tsx              # Homepage
    services/page.tsx
    portfolio/page.tsx
    portfolio/[slug]/page.tsx
    about/page.tsx
    events/page.tsx
    events/[slug]/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    contact/page.tsx
    studio/[[...index]]/page.tsx  # Sanity Studio
  globals.css
  layout.tsx              # root layout (html, body, fonts)
  
messages/
  fr.json
  en.json

middleware.ts             # next-intl routing middleware

i18n.ts                   # next-intl config
```

## Installation dépendances
```bash
npm install next-intl next-themes framer-motion
npm install resend react-hook-form zod @hookform/resolvers
npm install @radix-ui/react-dialog @radix-ui/react-accordion
npx shadcn@latest init
```

## middleware.ts (i18n routing)
```typescript
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed' // /fr est omis, /en est préfixé
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)']
}
```

## i18n.ts
```typescript
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}))
```

## Root Layout (app/layout.tsx)
```tsx
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  )
}
```

## Locale Layout (app/[locale]/layout.tsx)
```tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageTransition } from '@/components/PageTransition'
import { Toaster } from '@/components/ui/toaster'

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
        <Toaster />
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
```

## Page Transition (Framer Motion)
```tsx
// components/PageTransition.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
```

## globals.css — Design Tokens + Fonts + Neon
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=DM+Sans:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light mode */
    --bg-primary: #FAFAF5;
    --bg-secondary: #F0EDE6;
    --bg-card: #FFFFFF;
    --text-primary: #1A1510;
    --text-secondary: #6B5E4E;
    --text-muted: #9E8E7E;
    --accent-gold: #C9A227;
    --accent-gold-light: #E8C84A;
    --accent-gold-dark: #8B6914;
    --glow: rgba(201, 162, 39, 0.35);
    --glow-strong: rgba(201, 162, 39, 0.6);
    --border: rgba(201, 162, 39, 0.18);
    --border-strong: rgba(201, 162, 39, 0.4);
  }

  .dark {
    --bg-primary: #05070A;
    --bg-secondary: #0D0F12;
    --bg-card: #111318;
    --text-primary: #F5EDD6;
    --text-secondary: #A89070;
    --text-muted: #6B5E4E;
    --accent-gold: #C9A227;
    --accent-gold-light: #E8C84A;
    --accent-gold-dark: #8B6914;
    --glow: rgba(201, 162, 39, 0.4);
    --glow-strong: rgba(201, 162, 39, 0.7);
    --border: rgba(201, 162, 39, 0.15);
    --border-strong: rgba(201, 162, 39, 0.35);
  }

  * { box-sizing: border-box; }
  
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: var(--font-dm-sans), sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3 {
    font-family: var(--font-cormorant), serif;
    font-weight: 700;
  }
}

@layer components {
  /* Neon Gold Effects (luxe uniquement) */
  .neon-gold {
    box-shadow: 0 0 15px var(--glow), 0 0 30px var(--glow);
  }
  .neon-gold-text {
    text-shadow: 0 0 20px var(--glow), 0 0 40px rgba(201, 162, 39, 0.2);
  }
  .neon-border {
    border: 1px solid var(--accent-gold);
    box-shadow: 0 0 10px var(--glow), inset 0 0 10px rgba(201, 162, 39, 0.05);
  }
  
  /* Progress bar */
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-gold-dark), var(--accent-gold), var(--accent-gold-light));
    box-shadow: 0 0 8px var(--glow-strong);
    z-index: 100;
    transition: width 0.1s linear;
  }

  /* CTA Button Premium */
  .btn-gold {
    @apply px-6 py-3 font-medium rounded-sm;
    background: linear-gradient(135deg, var(--accent-gold-dark), var(--accent-gold), var(--accent-gold-light));
    color: #1A1510;
    transition: all 0.3s ease;
  }
  .btn-gold:hover {
    box-shadow: 0 0 20px var(--glow), 0 4px 20px rgba(0,0,0,0.2);
    transform: translateY(-1px);
  }
  
  .btn-outline-gold {
    @apply px-6 py-3 font-medium rounded-sm;
    border: 1px solid var(--accent-gold);
    color: var(--accent-gold);
    transition: all 0.3s ease;
  }
  .btn-outline-gold:hover {
    background: var(--accent-gold);
    color: #1A1510;
    box-shadow: 0 0 15px var(--glow);
  }

  /* Cards */
  .card-premium {
    background: var(--bg-card);
    border: 1px solid var(--border);
    transition: all 0.3s ease;
  }
  .card-premium:hover {
    border-color: var(--border-strong);
    box-shadow: 0 8px 40px rgba(0,0,0,0.12), 0 0 20px var(--glow);
    transform: translateY(-4px);
  }

  /* Section spacing */
  .section { @apply py-20 md:py-28 lg:py-32; }
  .container-premium { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8; }
}
```

## tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#C9A227',
          light: '#E8C84A',
          dark: '#8B6914',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(201,162,39,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(201,162,39,0.6)' },
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
```

## Navbar (pattern sticky + glassmorphism au scroll)
```tsx
// components/Navbar.tsx
'use client'
import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-[var(--bg-primary)]/80 border-b border-[var(--border)]' : 'bg-transparent'
      }`}
    >
      {/* ... nav content ... */}
    </nav>
  )
}
```

## Formulaire de devis avec Resend
```typescript
// app/api/quote/route.ts
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const quoteSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  eventType: z.string(),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  budget: z.string().optional(),
  location: z.string().optional(),
  services: z.array(z.string()).optional(),
  message: z.string().optional(),
  urgent: z.boolean().default(false),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = quoteSchema.parse(body)
    
    await resend.emails.send({
      from: 'M Event House <contact@meventhouse.fr>',
      to: ['contact@meventhouse.fr'],
      subject: `Nouvelle demande de devis — ${data.eventType}${data.urgent ? ' 🚨 URGENT' : ''}`,
      html: `
        <h2>Nouvelle demande de devis</h2>
        <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.phone}</p>
        <p><strong>Type d'événement :</strong> ${data.eventType}</p>
        ${data.eventDate ? `<p><strong>Date :</strong> ${data.eventDate}</p>` : ''}
        ${data.guestCount ? `<p><strong>Nb invités :</strong> ${data.guestCount}</p>` : ''}
        ${data.budget ? `<p><strong>Budget :</strong> ${data.budget}</p>` : ''}
        ${data.services?.length ? `<p><strong>Services :</strong> ${data.services.join(', ')}</p>` : ''}
        ${data.message ? `<p><strong>Message :</strong> ${data.message}</p>` : ''}
      `,
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur envoi' }, { status: 500 })
  }
}
```

## messages/fr.json (structure)
```json
{
  "nav": {
    "home": "Accueil",
    "services": "Services",
    "portfolio": "Portfolio",
    "about": "À propos",
    "events": "Événements",
    "blog": "Blog",
    "contact": "Contact",
    "cta": "Demander un devis"
  },
  "hero": {
    "title": "M Event House",
    "subtitle": "Chaque moment mérite d'être inoubliable.",
    "cta_portfolio": "Voir nos réalisations",
    "cta_quote": "Demander un devis"
  },
  "services": { "title": "Nos Prestations", "subtitle": "..." },
  "portfolio": { "title": "Nos Réalisations", "filter_all": "Tous" },
  "testimonials": { "title": "Ce que disent nos clients" },
  "contact": {
    "title": "Parlons de votre projet",
    "form": {
      "firstName": "Prénom",
      "lastName": "Nom",
      "email": "Email",
      "phone": "Téléphone",
      "eventType": "Type d'événement",
      "submit": "Envoyer ma demande",
      "success": "Demande envoyée ! Nous vous répondons sous 24h."
    }
  },
  "footer": { "rights": "Tous droits réservés" }
}
```

## Metadata SEO par page
```typescript
// Pattern à répliquer sur chaque page
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services' })
  return {
    title: `${t('metaTitle')} | M Event House`,
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/services`,
      languages: { fr: '/fr/services', en: '/en/services' }
    },
    openGraph: {
      title: `${t('metaTitle')} | M Event House`,
      description: t('metaDescription'),
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    }
  }
}
```

## .env.example
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
SANITY_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=https://meventhouse.fr
```

## Checklist qualité finale
- [ ] TypeScript strict — zéro `any`
- [ ] Toutes les pages ont `generateMetadata()`
- [ ] Images : `next/image` avec `priority` sur hero, `loading="lazy"` ailleurs
- [ ] `dynamic('...', { ssr: false })` pour composants Three.js et éditeurs
- [ ] `revalidate` configuré sur toutes les fetches Sanity
- [ ] `prefers-reduced-motion` respecté sur Three.js et animations
- [ ] Navbar links actifs avec `usePathname()` 
- [ ] Formulaire : validation Zod côté client + serveur
- [ ] Toast confirmation après submit formulaire
- [ ] `robots.txt` et `sitemap.xml` générés dynamiquement (`app/sitemap.ts`)
- [ ] Studio Sanity accessible seulement en preview/dev OU protégé