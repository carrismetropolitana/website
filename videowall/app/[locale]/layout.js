/* * */

import { availableLocales } from '@/translations/config';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

/* * */

export default function Layout({ children, params: { locale } }) {
	//

	if (!availableLocales.includes(locale)) notFound();

	const messages = useMessages();

	return (
		<NextIntlClientProvider
			locale={locale}
			messages={messages}
			now={Date.now()}
			timeZone="Europe/Lisbon"
			formats={{
				dateTime: {
					timestamp: {
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						month: 'long',
						year: 'numeric',
					},
				},
				number: {
					currency_euro: {
						currency: 'EUR',
						currencySign: 'standard',
						style: 'currency',
					},
					kilometers: {
						maximumFractionDigits: 2,
						style: 'unit',
						unit: 'kilometer',
						unitDisplay: 'short',
					},
					percentage: {
						maximumFractionDigits: 2,
						style: 'unit',
						unit: 'percent',
					},
				},
			}}
		>
			{children}
		</NextIntlClientProvider>
	);

	//
}
