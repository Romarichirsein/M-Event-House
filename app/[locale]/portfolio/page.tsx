'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ALL_PROJECTS = [
  // Vidéos
  {
    id: 'vid_1',
    src: '/portfolio/video.mp4',
    category: 'Vidéos',
    title: 'M Event House - Émotions & Prestige',
    type: 'video'
  },
  // Décoration
  ...Array.from({ length: 9 }).map((_, i) => ({
    id: `dec_${i + 1}`,
    src: `/portfolio/decoration/dec_${i + 1}.jpg`,
    category: 'Décoration',
    title: `Scénographie & Décors ${i + 1}`,
    type: 'image'
  })),
  // Traiteur
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `trait_${i + 1}`,
    src: `/portfolio/traiteur/trait_${i + 1}.jpg`,
    category: 'Traiteur',
    title: `Gastronomie & Buffet ${i + 1}`,
    type: 'image'
  })),
  // Surprise
  ...Array.from({ length: 5 }).map((_, i) => ({
    id: `surp_${i + 1}`,
    src: `/portfolio/surprise/surp_${i + 1}.jpg`,
    category: 'Surprise',
    title: `Événement Surprise ${i + 1}`,
    type: 'image'
  })),
].sort(() => Math.random() - 0.5); // Shuffle for a random masonry look

export default function PortfolioPage() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filters = ['Tous', 'Vidéos', 'Décoration', 'Traiteur', 'Surprise'];

  const filteredProjects = activeFilter === 'Tous'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div className="pt-32 pb-20">
      <section className="container-premium gap-y-20">
        <div className="space-y-12 mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-cormorant italic font-bold text-[var(--accent-gold)]"
          >
             Nos Réalisations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-light"
          >
             {locale === 'fr' 
               ? "Découvrez l'élégance et le savoir-faire de M Event House à travers nos plus beaux événements."
               : "Discover the elegance and craftsmanship of M Event House through our most beautiful events."}
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
           {filters.map((cat) => (
             <button 
               key={cat} 
               onClick={() => setActiveFilter(cat)}
               className={`px-6 py-2 border rounded-full text-sm uppercase tracking-widest transition-all ${
                 activeFilter === cat 
                 ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)] text-[#1A1510] font-bold' 
                 : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]'
               }`}
             >
                {cat}
             </button>
           ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
           <AnimatePresence>
             {filteredProjects.map((project, i) => (
               <motion.div 
                 layout
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ duration: 0.4 }}
                 key={project.id}
                 className="break-inside-avoid mb-8 group cursor-pointer"
               >
                  <div className="relative overflow-hidden rounded-sm aspect-[4/5] bg-[var(--bg-secondary)] border border-[var(--border)] group-hover:border-[var(--accent-gold)] transition-all duration-500">
                    {project.type === 'video' ? (
                      <video
                        src={project.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                        <h3 className="text-3xl font-cormorant italic font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{project.title}</h3>
                        <p className="text-[var(--accent-gold)] text-sm uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{project.category} • 2024</p>
                     </div>
                  </div>
               </motion.div>
             ))}
           </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}

