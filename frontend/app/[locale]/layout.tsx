/* * */

import { availableFormats, availableLocales, defaultLocale } from '@/translations/config';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

/* * */

export default async function Layout({ children, params: { locale } }) {
	//

	//
	// A. Setup variables

	let setLocale = locale;

	if (!availableLocales.includes(locale)) {
		setLocale = defaultLocale;
	}

	//
	// B. Fetch data

	const messages = await getMessages();

	//
	// C. Render components

	return (
		<NextIntlClientProvider
			formats={availableFormats}
			locale={setLocale}
			messages={messages}
			now={new Date()}
			timeZone="Europe/Lisbon"
		>
			{children}
		</NextIntlClientProvider>
	);

	//
}
