//
// LOCALE LAYOUT

import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppTopBar from '@/components/AppTopBar/AppTopBar';
import AppHeader from '@/components/AppHeader/AppHeader';
import AppFooter from '@/components/AppFooter/AppFooter';

export default async function LocaleLayout({ children, params: { locale } }) {
  //

  let messages;
  try {
    messages = (await import(`../../translations/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  //updateInterval={1}

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Lisbon" now={Date.now()}>
      <AppWrapper>
        <AppTopBar />
        <AppHeader />
        {children}
        {/* <AppFooter /> */}
      </AppWrapper>
    </NextIntlClientProvider>
  );
}
