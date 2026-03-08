'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ScrollOverlays } from '@/components/ScrollOverlays';
import { ScrollImageSequence } from '@/components/ScrollImageSequence';
import { ServiceCard } from '@/components/ServiceCard';
import { Sparkles, Utensils, Flower2, PartyPopper } from 'lucide-react';
import { motion, useScroll } from 'framer-motion';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgress(latest);
    });
  }, [scrollYProgress]);

  const services = [
    { title: "Mariages d'Exception", icon: Sparkles, href: "/services/mariage", delay: 0.1, description: "Organisation complète pour le plus beau jour de votre vie." },
    { title: "Service Traiteur", icon: Utensils, href: "/services/traiteur", delay: 0.2, description: "Une expérience culinaire raffinée et personnalisée." },
    { title: "Décoration Florale", icon: Flower2, href: "/services/decoration", delay: 0.3, description: "Bouquets d'argent et scénographies florales uniques." },
    { title: "Événements Surprises", icon: PartyPopper, href: "/services/surprise", delay: 0.4, description: "Créez l'inattendu avec nos mises en scène spectaculaires." },
  ];

  return (
    <div className="relative">
      {/* ─── SCROLL-DRIVEN IMAGE SEQUENCE SECTION ─── */}
      <div ref={containerRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* The frame-by-frame sequence fills the entire hero area */}
          <ScrollImageSequence progress={progress} />

          {/* Gradient overlay so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

          {/* Scrollytelling text overlays */}
          <ScrollOverlays progress={progress} />

          {/* Scroll progress bar */}
          <div
            className="fixed top-0 left-0 h-1 bg-[var(--accent-gold)] neon-gold z-50 transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />

          {/* Scroll hint on first screen */}
          {progress < 0.05 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/70 pointer-events-none z-20"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Scroll</span>
              <div className="w-px h-10 bg-gradient-to-b from-[var(--accent-gold)] to-transparent" />
            </motion.div>
          )}
        </div>
      </div>

      {/* ─── SERVICES PREVIEW ─── */}
      <section className="py-32 bg-[var(--bg-secondary)] relative z-20 border-t border-[var(--border)]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-cormorant italic font-bold text-[var(--accent-gold)] mb-6">
              Nos Prestations
            </h2>
            <div className="w-24 h-px bg-[var(--accent-gold)] mx-auto opacity-50" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <ServiceCard
                key={idx}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
                delay={service.delay}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
