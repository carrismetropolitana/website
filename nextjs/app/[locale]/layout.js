/* * */

import { notFound } from 'next/navigation';
import { availableLocales } from '@/translations/config';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import AppAnalytics from '@/components/AppAnalytics/AppAnalytics';

/* * */

export default function Layout({ children, params: { locale } }) {
  //

  if (!availableLocales.includes(locale)) notFound();

  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Lisbon" now={Date.now()}>
      <AppAnalytics />
      {children}
    </NextIntlClientProvider>
  );

  //
}
