//
// LOCALE LAYOUT

import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppTopBar from '@/components/AppTopBar/AppTopBar';
import AppHeader from '@/components/AppHeader/AppHeader';
import AppFooter from '@/components/AppFooter/AppFooter';
import AnalyticsAuthorizer from '@/components/AnalyticsAuthorizer/AnalyticsAuthorizer';
import MaintenanceWarning from '@/components/MaintenanceWarning/MaintenanceWarning';

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
      <AnalyticsAuthorizer />
      <AppWrapper>
        <AppTopBar />
        <AppHeader />
        <MaintenanceWarning />
        {/* {children} */}
        <AppFooter />
      </AppWrapper>
    </NextIntlClientProvider>
  );
}
