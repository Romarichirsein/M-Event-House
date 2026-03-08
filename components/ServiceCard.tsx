'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  delay?: number;
}

export function ServiceCard({ title, description, icon: Icon, href, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="card-premium p-8 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
        <Icon size={120} className="text-[var(--accent-gold)]" />
      </div>
      
      <div className="relative z-10 space-y-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] mb-6 group-hover:neon-gold transition-all duration-300">
          <Icon size={24} />
        </div>
        
        <h3 className="text-2xl font-cormorant italic font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
          {title}
        </h3>
        
        <p className="text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
        
        <Link 
          href={href} 
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--accent-gold)] pt-4 group-hover:gap-4 transition-all"
        >
          Découvrir <span className="text-xl">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
