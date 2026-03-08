'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ButtonPremium } from '@/components/ButtonPremium';
import { CardPremium } from '@/components/CardPremium';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServiceCategoryPage({ params }: { params: { slug: string } }) {
  const t = useTranslations('services');
  const locale = useLocale();
  
  const content = (t as any).raw(params.slug);
  
  if (!content) return <div>Service non trouvé</div>;

  return (
    <div className="pt-32 pb-20">
      <section className="container-premium space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--accent-gold)]">Service Premium</span>
            <h1 className="text-6xl md:text-9xl font-cormorant italic font-bold leading-tight">{content.title}</h1>
            <p className="text-2xl text-[var(--text-secondary)] font-light leading-relaxed">
              {params.slug === 'traiteur' && "Une excellence gastronomique au service de vos émotions."}
              {params.slug === 'decoration' && "Sublimez chaque espace pour le transformer en un lieu magique."}
              {params.slug === 'surprise' && "Créez l'inattendu avec des mises en scène spectaculaires."}
            </p>
            <div className="pt-8">
               <Link href="/contact">
                 <ButtonPremium variant="gold" size="lg">Démarrez votre projet</ButtonPremium>
               </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square bg-[var(--bg-secondary)] border border-[var(--border)] overflow-hidden rounded-sm flex items-center justify-center"
          >
             <div className="text-center space-y-4 p-8">
               <CheckCircle2 className="mx-auto text-[var(--accent-gold)]" size={64} />
               <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--accent-gold)]">Expérience Garantie</p>
             </div>
          </motion.div>
        </div>

        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-cormorant italic font-bold">Le Déroulement</h2>
            <div className="h-px w-24 bg-[var(--accent-gold)] mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {content.steps.map((step: string, i: number) => {
               const [title, description] = step.split(' : ');
               return (
                 <CardPremium key={i} delay={i * 0.1} className="p-10 space-y-6 flex flex-col h-full bg-[var(--bg-secondary)] border-[var(--border)] hover:border-[var(--accent-gold)]/50 transition-colors">
                    <span className="text-4xl font-cormorant italic text-[var(--accent-gold)] opacity-30">0{i + 1}</span>
                    <h3 className="text-2xl font-cormorant italic font-bold">{title}</h3>
                    <p className="text-[var(--text-secondary)] font-light leading-relaxed">{description}</p>
                 </CardPremium>
               );
             })}
          </div>
        </div>
      </section>
    </div>
  );
}
