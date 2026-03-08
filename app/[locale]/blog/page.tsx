'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ButtonPremium } from '@/components/ButtonPremium';
import { CardPremium } from '@/components/CardPremium';

export default function BlogPage() {
  const t = useTranslations('nav');
  const locale = useLocale();

  return (
    <div className="pt-32 pb-20">
      <section className="container-premium">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-cormorant italic font-bold text-[var(--accent-gold)]"
            >
              Journal & Inspirations
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-[var(--text-secondary)] font-light"
            >
              {locale === 'fr' 
                ? "Tendances, conseils et coulisses de l’événementiel premium."
                : "Trends, tips, and behind-the-scenes of premium event planning."}
            </motion.p>
          </div>

          <div className="space-y-32">
            {[1, 2, 3].map((i) => (
              <motion.article 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
              >
                <div className="relative aspect-video bg-[var(--bg-secondary)] border border-[var(--border)] overflow-hidden rounded-sm group-hover:border-[var(--accent-gold)]/50 transition-colors duration-500">
                   <div className="absolute inset-0 bg-[var(--accent-gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   {/* SanityImage */}
                </div>
                <div className="space-y-8">
                  <div className="flex gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--accent-gold)]">
                    <span>{i === 1 ? 'TENDANCES' : 'MARIAGE'}</span>
                    <span className="opacity-30">•</span>
                    <span className="text-[var(--text-secondary)]">Mars 2024</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-cormorant italic font-bold group-hover:text-[var(--accent-gold)] transition-colors duration-500 leading-tight">
                    Comment créer une ambiance inoubliable pour votre soirée corporate
                  </h2>
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed line-clamp-3 font-light">
                    Découvrez nos conseils exclusifs pour transformer une simple réunion de travail en un événement mémorable qui marquera l'esprit de vos collaborateurs...
                  </p>
                  <ButtonPremium variant="ghost" size="sm" className="border-b border-[var(--accent-gold)]/30 rounded-none px-0 hover:border-[var(--accent-gold)]">
                    {locale === 'fr' ? 'Lire la suite' : 'Read more'}
                  </ButtonPremium>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
