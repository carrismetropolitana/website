/* * */

import { availableFormats, availableLocales } from '@/translations/config';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

/* * */

export default async function Layout({ children, params: { locale } }) {
	//

	if (!availableLocales.includes(locale)) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<NextIntlClientProvider
			formats={availableFormats}
			locale={locale}
			messages={messages}
			now={new Date()}
			timeZone="Europe/Lisbon"
		>
			{children}
		</NextIntlClientProvider>
	);

	//
}
