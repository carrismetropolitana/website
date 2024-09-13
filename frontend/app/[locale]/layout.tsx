/* * */

import { availableFormats, availableLocales } from '@/translations/config';
import { Notifications } from '@mantine/notifications';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import Providers from './providers';

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
			<Providers>
				<Notifications styles={{ root: { marginTop: '60px' } }} />
				{children}
			</Providers>
		</NextIntlClientProvider>
	);

	//
}
