'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Star, Heart, Award } from 'lucide-react';
import { CardPremium } from '@/components/CardPremium';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="container-premium mb-32">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-cormorant italic font-bold text-[var(--accent-gold)]">
                {t('title')}
              </h2>
              <div className="text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed whitespace-pre-line">
                {t('history')}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--bg-secondary)] border-y border-[var(--border)] py-32 relative overflow-hidden">
        <div className="container-premium relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ValueCard 
              icon={Star} 
              title={t('values.excellence')} 
              description={locale === 'fr' ? "Le souci du détail est au cœur de chacune de nos réalisations." : "Attention to detail is at the heart of each of our achievements."} 
              delay={0.1}
            />
            <ValueCard 
              icon={Heart} 
              title={t('values.bespoke')} 
              description={locale === 'fr' ? "Chaque événement est unique et reflète votre personnalité." : "Each event is unique and reflects your personality."} 
              delay={0.2}
            />
            <ValueCard 
              icon={Award} 
              title={t('values.creative')} 
              description={locale === 'fr' ? "Nous repoussons les limites pour vous offrir l'inattendu." : "We push the boundaries to offer you the unexpected."} 
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Legal Info Section */}
      <section className="container-premium mt-32">
        <div className="max-w-3xl mx-auto bg-[var(--bg-card)] border border-[var(--border)] p-12 rounded-sm space-y-8">
          <h2 className="text-3xl font-cormorant italic text-[var(--accent-gold)] border-b border-[var(--border)] pb-4">
            Informations Légales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[var(--text-secondary)]">
            <div className="space-y-4">
              <p><strong>Dénomination :</strong> M EVENT HOUSE</p>
              <p><strong>Forme juridique :</strong> (À compléter)</p>
              <p><strong>Adresse :</strong> (À compléter par le client)</p>
            </div>
            <div className="space-y-4">
              <p><strong>Facebook :</strong> https://www.facebook.com/MEventhouse</p>
              <p><strong>SIREN / SIRET :</strong> (À compléter)</p>
              <p><strong>Publications :</strong> Annonces légales accessibles sur demande</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) {
  return (
    <CardPremium delay={delay} className="text-center group">
      <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] mb-8 transition-all duration-500 group-hover:scale-110 group-hover:neon-gold">
        <Icon size={36} />
      </div>
      <h3 className="text-3xl font-cormorant italic font-bold mb-4">{title}</h3>
      <p className="text-[var(--text-secondary)] leading-relaxed">{description}</p>
    </CardPremium>
  );
}
