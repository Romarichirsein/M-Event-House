'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import Image from 'next/image';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/about', label: t('about') },
    { href: '/events', label: t('events') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-[var(--bg-primary)]/80 border-b border-[var(--border)] py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-premium flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="M Event House Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === `/${locale}${link.href}` || (link.href === '/' && pathname === `/${locale}`);
            return (
              <Link
                key={link.href}
                href={`/${locale}${link.href === '/' ? '' : link.href}`}
                className={`text-sm font-medium uppercase tracking-widest transition-colors hover:text-[var(--accent-gold)] ${
                  isActive ? 'text-[var(--accent-gold)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {/* Locale Switcher (Toggle for demo) */}
          <Link
            href={pathname.replace(`/${locale}`, locale === 'fr' ? '/en' : '/fr')}
            className="p-2 rounded-full hover:bg-[var(--border)] transition-colors text-[var(--text-secondary)]"
            title={locale === 'fr' ? 'Switch to English' : 'Passer en Français'}
          >
            <span className="text-xs font-bold uppercase">{locale === 'fr' ? 'EN' : 'FR'}</span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-[var(--border)] transition-colors text-[var(--text-secondary)]"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* CTA */}
          <Link href="/contact" className="btn-gold text-xs uppercase tracking-widest px-4 py-2">
            {t('cta')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-[var(--text-primary)]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 top-[72px] bg-[var(--bg-primary)] z-40 transition-transform duration-500 lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-cormorant italic text-[var(--text-primary)] hover:text-[var(--accent-gold)]"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-6 mt-8">
            <Link
              href={pathname.replace(`/${locale}`, locale === 'fr' ? '/en' : '/fr')}
              className="text-lg font-bold uppercase text-[var(--accent-gold)]"
            >
              {locale === 'fr' ? 'English' : 'Français'}
            </Link>
            <button
               onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
                setMobileOpen(false);
              }}
              className="text-[var(--text-primary)]"
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn-gold w-full text-center mt-4"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </nav>
  );
}
