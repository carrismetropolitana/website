/* * */

import { availableFormats } from '@/i18n/config';
import { ColorSchemeScript } from '@mantine/core';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

/* * */

const inter = Inter({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['500', '600', '700', '800'],
});

/* * */

export const metadata = {
	description: 'Horários e Paragens',
	metadataBase: process.env.VERCEL_URL ? new URL(`https://${process.env.VERCEL_URL}`) : new URL(`http://0.0.0.0:${process.env.PORT || 3000}`),
	title: 'Carris Metropolitana',
};

/* * */

export default async function RootLayout({ children }) {
	//

	//
	// A. Fetch data

	const locale = await getLocale();
	const messages = await getMessages();

	//
	// B. Render components

	return (
		<html className={inter.variable} lang={locale}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<NextIntlClientProvider
					formats={availableFormats}
					locale={locale}
					messages={messages}
				>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);

	//
}
