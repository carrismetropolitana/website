/* * */

import LayoutViewportWrapper from '@/components/layout/ViewportWrapper';
import { availableFormats, availableLocales } from '@/translations/config';
import { Notifications } from '@mantine/notifications';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import Providers from './providers';

/* * */

export default function Layout({ children, params: { locale } }) {
	//

	if (!availableLocales.includes(locale)) {
		notFound();
	}

	const messages = useMessages();

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
				<LayoutViewportWrapper>
					{children}
				</LayoutViewportWrapper>
			</Providers>
		</NextIntlClientProvider>
	);

	//
}
