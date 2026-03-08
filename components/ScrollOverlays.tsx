'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

interface OverlayProps {
  progress: number;
}

export function ScrollOverlays({ progress }: OverlayProps) {
  const t = useTranslations('hero');
  const locale = useLocale();

  const overlays = [
    {
      threshold: 0,
      duration: 0.15,
      position: 'center',
      content: (
        <div className="text-center space-y-4">
          <motion.h1 className="text-6xl md:text-8xl font-cormorant italic font-bold text-[var(--accent-gold)] tracking-tighter neon-gold-text">
            {t('title')}
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-[var(--text-secondary)] font-medium max-w-lg mx-auto">
            {t('subtitle')}
          </motion.p>
          <div className="flex gap-4 justify-center mt-8">
            <Link href={`/${locale}/portfolio`} className="btn-gold uppercase tracking-widest text-xs">
              {t('cta_portfolio')}
            </Link>
          </div>
        </div>
      )
    },
    {
      threshold: 0.2,
      duration: 0.2,
      position: 'left',
      content: (
        <div className="max-w-xl space-y-4 pl-8 md:pl-20">
          <h2 className="text-4xl md:text-6xl font-cormorant italic font-bold text-[var(--accent-gold)]">
            {locale === 'fr' ? "Votre vision, notre expertise" : "Your vision, our expertise"}
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            {locale === 'fr' 
              ? "Décoration, traiteur, organisation sur-mesure — nous créons l'événement que vous imaginez."
              : "Decoration, catering, bespoke events — we bring your vision to life."}
          </p>
        </div>
      )
    },
    {
      threshold: 0.45,
      duration: 0.2,
      position: 'right',
      content: (
        <div className="max-w-xl space-y-4 pr-8 md:pr-20 ml-auto">
          <h2 className="text-4xl md:text-6xl font-cormorant italic font-bold text-[var(--accent-gold)]">
            {locale === 'fr' ? "Des détails qui font la différence" : "Details that make the difference"}
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed text-right">
            {locale === 'fr'
              ? "Bouquets d'argent, compositions florales, ambiances uniques — chaque détail est pensé."
              : "Silver bouquets, floral arrangements, unique atmospheres — every detail matters."}
          </p>
        </div>
      )
    },
    {
      threshold: 0.7,
      duration: 0.2,
      position: 'center',
      content: (
        <div className="text-center space-y-4 max-w-2xl px-4">
          <h2 className="text-4xl md:text-6xl font-cormorant italic font-bold text-[var(--accent-gold)]">
            {locale === 'fr' ? "Reconnus pour notre excellence" : "Recognized for our excellence"}
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)]">
            {locale === 'fr'
              ? "Des centaines d'événements réussis. Des clients qui reviennent."
              : "Hundreds of successful events. Clients who come back."}
          </p>
        </div>
      )
    },
    {
      threshold: 0.9,
      duration: 0.1,
      position: 'center',
      content: (
        <div className="text-center space-y-6 max-w-2xl px-4">
          <h2 className="text-4xl md:text-6xl font-cormorant italic font-bold text-[var(--accent-gold)]">
            {locale === 'fr' ? "Prêt à créer quelque chose d'extraordinaire ?" : "Ready to create something extraordinary?"}
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)]">
            {locale === 'fr' ? "Devis gratuit — réponse sous 24h" : "Free quote — response within 24h"}
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Link href={`/${locale}/contact`} className="btn-gold uppercase tracking-widest text-xs">
              {t('cta_quote')}
            </Link>
            <Link href={`/${locale}/portfolio`} className="btn-outline-gold uppercase tracking-widest text-xs">
              {t('cta_portfolio')}
            </Link>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {overlays.map((overlay, i) => {
        const isVisible = progress >= overlay.threshold && progress < overlay.threshold + overlay.duration;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 20,
              pointerEvents: isVisible ? 'auto' : 'none'
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`absolute inset-0 flex items-center ${
              overlay.position === 'center' ? 'justify-center' : 
              overlay.position === 'left' ? 'justify-start' : 'justify-end'
            }`}
          >
            {/* Backdrop semi-transparent derrière le texte */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.52)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '1.25rem',
                border: '1px solid rgba(200, 160, 60, 0.18)',
                padding: '2.5rem 3rem',
                boxShadow: '0 8px 40px rgba(0,0,0,0.45)',
                maxWidth: '90vw',
              }}
            >
              {overlay.content}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
