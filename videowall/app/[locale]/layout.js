/* * */

import { notFound } from 'next/navigation';
import { availableLocales } from '@/translations/config';
import { NextIntlClientProvider, useMessages } from 'next-intl';

/* * */

export default function Layout({ children, params: { locale } }) {
  //

  if (!availableLocales.includes(locale)) notFound();

  const messages = useMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Europe/Lisbon"
      now={Date.now()}
      formats={{
        number: {
          kilometers: {
            style: 'unit',
            unit: 'kilometer',
            unitDisplay: 'short',
            maximumFractionDigits: 2,
          },
          currency_euro: {
            currencySign: 'standard',
            style: 'currency',
            currency: 'EUR',
          },
          percentage: {
            style: 'unit',
            unit: 'percent',
            maximumFractionDigits: 2,
          },
        },
        dateTime: {
          timestamp: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          },
        },
      }}
    >
      {children}
    </NextIntlClientProvider>
  );

  //
}
