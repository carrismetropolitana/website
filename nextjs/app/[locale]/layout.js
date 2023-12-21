/* * */

import { notFound } from 'next/navigation';
import { availableLocales } from '@/translations/config';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import FrontendWrapper from '@/components/FrontendWrapper/FrontendWrapper';
import FrontendBrandSwitcher from '@/components/FrontendBrandSwitcher/FrontendBrandSwitcher';
import FrontendHeader from '@/components/FrontendHeader/FrontendHeader';
import FrontendFooter from '@/components/FrontendFooter/FrontendFooter';
import FrontendAnalytics from '@/components/FrontendAnalytics/FrontendAnalytics';
// import StatusMessage from '@/components/StatusMessage/StatusMessage';
// import MaintenanceWarning from '@/components/MaintenanceWarning/MaintenanceWarning';

/* * */

export default function Layout({ children, params: { locale } }) {
  //

  if (!availableLocales.includes(locale)) notFound();

  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Lisbon" now={Date.now()}>
      <FrontendAnalytics />
      <FrontendWrapper>
        <FrontendBrandSwitcher />
        <FrontendHeader />
        {/* <StatusMessage /> */}
        {/* <MaintenanceWarning /> */}
        {children}
        <FrontendFooter />
      </FrontendWrapper>
    </NextIntlClientProvider>
  );

  //
}
