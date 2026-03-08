'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ServiceCard } from '@/components/ServiceCard';
import { Sparkles, Utensils, Flower2, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';
import { ButtonPremium } from '@/components/ButtonPremium';

export default function ServicesPage() {
  const t = useTranslations('nav');
  const locale = useLocale();

  const services = [
    { title: 'Mariages', icon: Heart, description: 'Organisation complète pour le plus beau jour de votre vie.' },
    { title: 'Corporate', icon: Briefcase, description: 'Événements d\'entreprise, lancements et soirées de gala.' },
    { title: 'Cadeaux Surprises', icon: Gift, description: 'Bouquets d\'argent, fleurs et attentions mémorables.' },
    { title: 'Décoration', icon: Palette, description: 'Sublimez vos lieux avec nos ambiances sur-mesure.' },
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="container-premium">
        <div className="text-center max-w-4xl mx-auto space-y-12 mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-cormorant italic font-bold text-[var(--accent-gold)]"
          >
             Prestations sur-mesure
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-[var(--text-secondary)] font-light leading-relaxed"
          >
             De la conception à la réalisation, nous gérons chaque aspect de votre événement avec une précision artisanale et un sens aigu du détail.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <ServiceCard 
             title="Mariages d'Exception" 
             description="De la recherche du lieu parfait à la coordination du jour J, nous créons des mariages qui vous ressemblent et marquent les esprits."
             icon={Sparkles}
             href="/services/mariage"
           />
           <ServiceCard 
             title="Service Traiteur" 
             description="Une expérience culinaire raffinée, adaptée à vos envies et aux régimes spécifiques, signée par nos chefs partenaires."
             icon={Utensils}
             href="/services/traiteur"
           />
           <ServiceCard 
             title="Décoration Florale" 
             description="Compositions uniques, bouquets d'argent signature et scénographies florales pour toutes vos occasions."
             icon={Flower2}
             href="/services/decoration"
           />
           <ServiceCard 
             title="Événements Surprises" 
             description="Organisez l'inattendu : anniversaires, demandes en mariage, bouquets cadeaux et mises en scène spectaculaires."
             icon={PartyPopper}
             href="/services/surprise"
           />
        </div>
      </section>
    </div>
  );
}

// Icons placeholders since Lucide might not be loaded yet
const Heart = () => <div />;
const Briefcase = () => <div />;
const Gift = () => <div />;
const Palette = () => <div />;
