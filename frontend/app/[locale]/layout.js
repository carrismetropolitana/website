/* * */

import { notFound } from 'next/navigation';
import { availableLocales } from '@/translations/config';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppTopBar from '@/components/AppTopBar/AppTopBar';
import AppHeader from '@/components/AppHeader/AppHeader';
import AppFooter from '@/components/AppFooter/AppFooter';
import AnalyticsAuthorizer from '@/components/AnalyticsAuthorizer/AnalyticsAuthorizer';
import StatusMessage from '@/components/StatusMessage/StatusMessage';
// import MaintenanceWarning from '@/components/MaintenanceWarning/MaintenanceWarning';

/* * */

export default function Layout({ children, params: { locale } }) {
  //

  if (!availableLocales.includes(locale)) notFound();

  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Lisbon" now={Date.now()}>
      <AnalyticsAuthorizer />
      <AppWrapper>
        <AppTopBar />
        <AppHeader />
        {/* <StatusMessage /> */}
        {/* <MaintenanceWarning /> */}
        {children}
        <AppFooter />
      </AppWrapper>
    </NextIntlClientProvider>
  );
}
