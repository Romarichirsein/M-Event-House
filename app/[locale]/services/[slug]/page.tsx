import { locales } from '@/i18n/config';
import ServiceCategoryClient from '@/components/ServiceCategoryClient';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = ['mariage', 'traiteur', 'decoration', 'surprise'];
  const params: { locale: string; slug: string }[] = [];
  
  locales.forEach((locale) => {
    slugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });
  
  return params;
}

export default async function ServicePage({ 
  params: { locale, slug } 
}: { 
  params: { locale: string; slug: string } 
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('services');
  
  let content;
  try {
    content = t.raw(slug);
  } catch (e) {
    notFound();
  }

  if (!content) {
    notFound();
  }

  return <ServiceCategoryClient slug={slug} content={content} />;
}
