/* * */

import AppAnalytics from '@/components/AppAnalytics/AppAnalytics';
import { availableLocales } from '@/i18n/config';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

/* * */

export default function Layout({ children, params: { locale } }) {
	//

	if (!availableLocales.includes(locale)) notFound();

	const messages = useMessages();

	return (
		<NextIntlClientProvider locale={locale} messages={messages} now={Date.now()} timeZone="Europe/Lisbon">
			<AppAnalytics />
			{children}
		</NextIntlClientProvider>
	);

	//
}
