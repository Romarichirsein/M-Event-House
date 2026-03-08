'use client';

import { useTranslations, useLocale } from 'next-intl';
import { QuoteForm } from '@/components/QuoteForm';
import { CardPremium } from '@/components/CardPremium';
import { Mail, Phone, Share2, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();

  return (
    <div className="pt-32 pb-20 overflow-hidden">
      <section className="container-premium">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-cormorant italic font-bold text-[var(--accent-gold)]"
            >
              {t('title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-[var(--text-secondary)] font-light"
            >
              {t('subtitle')}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[var(--bg-card)] border border-[var(--border)] p-8 md:p-16 rounded-sm shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent" />
            <QuoteForm />
          </motion.div>

          {/* Practical Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
             <CardPremium delay={0.6} className="text-center group">
                <Mail className="mx-auto mb-6 text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />
                <h3 className="text-[var(--accent-gold)] font-bold uppercase tracking-widest text-xs mb-4">Email</h3>
                <p className="font-cormorant text-2xl italic text-[var(--text-primary)]">merveillesitcheu@gmail.com</p>
             </CardPremium>
             <CardPremium delay={0.7} className="text-center group">
                <Phone className="mx-auto mb-6 text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />
                <h3 className="text-[var(--accent-gold)] font-bold uppercase tracking-widest text-xs mb-4">Téléphone</h3>
                <p className="font-cormorant text-2xl italic text-[var(--text-primary)]">+237 682 65 19 71</p>
             </CardPremium>
             <CardPremium delay={0.8} className="text-center group">
                <Share2 className="mx-auto mb-6 text-[var(--accent-gold)] group-hover:scale-110 transition-transform" />
                <h3 className="text-[var(--accent-gold)] font-bold uppercase tracking-widest text-xs mb-4">Social</h3>
                <p className="font-cormorant text-2xl italic text-[var(--text-primary)]">M Event House</p>
             </CardPremium>
          </div>
        </div>
      </section>
    </div>
  );
}
