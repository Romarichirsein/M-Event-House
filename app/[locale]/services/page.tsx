import { unstable_setRequestLocale } from 'next-intl/server';
import ServicesClient from '@/components/ServicesClient';

export default async function ServicesPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale);

  return <ServicesClient />;
}
