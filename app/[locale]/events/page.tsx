'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { CardPremium } from '@/components/CardPremium';
import { ButtonPremium } from '@/components/ButtonPremium';
import { MapPin, Clock, Calendar as CalendarIcon } from 'lucide-react';

export default function EventsPage() {
  const t = useTranslations('nav');
  const locale = useLocale();

  return (
    <div className="pt-32 pb-20">
      <section className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-16">
            <div className="space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-cormorant italic font-bold text-[var(--accent-gold)]"
              >
                 Événements & Ateliers
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl text-[var(--text-secondary)] font-light"
              >
                 Rejoignez-nous lors de nos prochains événements exclusifs ou ateliers créatifs.
              </motion.p>
            </div>

            <div className="space-y-12">
               {[1, 2].map((i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.2 }}
                 >
                   <CardPremium className="flex flex-col md:flex-row gap-12 p-8 group">
                      <div className="md:w-48 h-48 bg-[var(--bg-secondary)] rounded-sm overflow-hidden flex flex-col items-center justify-center border border-[var(--border)] group-hover:border-[var(--accent-gold)]/30 transition-colors">
                         <span className="text-5xl font-cormorant italic font-bold text-[var(--accent-gold)]">1{i}</span>
                         <span className="text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">Avril 2024</span>
                      </div>
                      <div className="flex-1 space-y-6">
                         <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--accent-gold)] flex items-center gap-2">
                           <CalendarIcon size={12} />
                           Atelier Floral
                         </div>
                         <h2 className="text-4xl font-cormorant italic font-bold group-hover:text-[var(--accent-gold)] transition-colors duration-500">L'Art du Bouquet de Mariée</h2>
                         <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed">Une matinée d'apprentissage avec nos experts pour créer votre propre composition unique.</p>
                         <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text-secondary)]">
                            <span className="flex items-center gap-2"><MapPin size={12} className="text-[var(--accent-gold)]" /> Paris, France</span>
                            <span className="flex items-center gap-2"><Clock size={12} className="text-[var(--accent-gold)]" /> 10h00 - 13h00</span>
                         </div>
                      </div>
                      <div className="flex items-end">
                         <ButtonPremium variant="gold" size="sm">Réserver</ButtonPremium>
                      </div>
                   </CardPremium>
                 </motion.div>
               ))}
            </div>
          </div>

          <aside className="space-y-12">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.6 }}
               className="p-10 bg-[var(--bg-card)] border border-[var(--border)] rounded-sm space-y-10 shadow-xl relative overflow-hidden group"
             >
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent-gold)] opacity-50" />
                <h3 className="text-3xl font-cormorant italic font-bold text-[var(--accent-gold)]">Calendrier</h3>
                <div className="grid grid-cols-7 gap-4 text-center text-[10px] font-bold uppercase tracking-widest">
                   {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => <div key={d} className="opacity-30">{d}</div>)}
                   {Array.from({length: 31}).map((_, i) => (
                      <div key={i} className={`p-3 rounded-full transition-all duration-300 cursor-pointer ${(i + 1) === 12 || (i + 1) === 18 ? 'bg-[var(--accent-gold)] text-black font-bold neon-gold' : 'hover:bg-[var(--accent-gold)]/10'}`}>
                         {i + 1}
                      </div>
                   ))}
                </div>
             </motion.div>
          </aside>
        </div>
      </section>
    </div>
  );
}
