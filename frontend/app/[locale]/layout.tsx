/* * */

import LayoutViewportWrapper from '@/components/layout/ViewportWrapper';
import { availableFormats, availableLocales } from '@/translations/config';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

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
			<LayoutViewportWrapper>
				{children}
			</LayoutViewportWrapper>
		</NextIntlClientProvider>
	);

	//
}
