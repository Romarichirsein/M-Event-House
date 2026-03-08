import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { PageTransition } from '@/components/PageTransition';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

import { locales } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
