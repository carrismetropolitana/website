/* * */

import { availableFormats } from '@/i18n/config';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

/* * */

export default async function Layout({ children, params: { locale } }) {
	//

	//
	// A. Fetch data

	const messages = await getMessages();

	//
	// B. Render components

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
