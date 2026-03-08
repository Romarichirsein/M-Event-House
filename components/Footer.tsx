'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] pt-20 pb-10">
      <div className="container-premium gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-6">
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/logo.png"
              alt="M Event House Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </Link>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-xs">
            {locale === 'fr'
              ? "Chaque moment mérite d'être inoubliable. Nous créons des expériences uniques pour vos événements les plus précieux."
              : "Every moment deserves to be unforgettable. We create unique experiences for your most precious events."}
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/MEventhouse" target="_blank" rel="noopener noreferrer" className="p-2 border border-[var(--border)] rounded-full text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-[#1A1510] transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 border border-[var(--border)] rounded-full text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-[#1A1510] transition-all">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-bold tracking-wider uppercase text-[var(--accent-gold)]">{t('services')}</h4>
          <ul className="space-y-4">
            <li><Link href={`/${locale}/services`} className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors">Décoration Événementielle</Link></li>
            <li><Link href={`/${locale}/services`} className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors">Service Traiteur</Link></li>
            <li><Link href={`/${locale}/services`} className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors">Organisation d'Événements</Link></li>
            <li><Link href={`/${locale}/services`} className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors">Organisation Complète</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-bold tracking-wider uppercase text-[var(--accent-gold)]">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link href={`/${locale}/portfolio`} className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors">{t('portfolio')}</Link></li>
            <li><Link href={`/${locale}/about`} className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors">{t('about')}</Link></li>
            <li><Link href={`/${locale}/blog`} className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors">{t('blog')}</Link></li>
            <li><Link href={`/${locale}/contact`} className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors">{t('contact')}</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-bold tracking-wider uppercase text-[var(--accent-gold)]">Contact</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 text-[var(--text-secondary)]">
              <Phone size={18} className="text-[var(--accent-gold)] shrink-0" />
              <span>+237 682 65 19 71</span>
            </li>
            <li className="flex gap-3 text-[var(--text-secondary)]">
              <Mail size={18} className="text-[var(--accent-gold)] shrink-0" />
              <span>merveillesitcheu@gmail.com</span>
            </li>
            <li className="flex gap-3 text-[var(--text-secondary)]">
              <MapPin size={18} className="text-[var(--accent-gold)] shrink-0" />
              <span>Yaoundé, Cameroun</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-premium mt-20 pt-10 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--text-secondary)]">
        <p>© {currentYear} M Event House. Tous droits réservés.</p>
        <div className="flex gap-6">
          <Link href={`/${locale}/about`} className="hover:text-[var(--accent-gold)] transition-colors">{t('legal')}</Link>
          <Link href={`/${locale}/about`} className="hover:text-[var(--accent-gold)] transition-colors">{t('privacy')}</Link>
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)] opacity-50">
          Powered by <span className="text-[var(--accent-gold)] opacity-100 font-bold">Wellborne</span>
        </p>
      </div>
    </footer>
  );
}
