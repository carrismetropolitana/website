/* * */

import { availableFormats } from '@/i18n/config';
import { PrivacyProviders } from '@/providers/privacy-providers';
import { type Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

/* * */

import '@/themes/_reset/reset.css';

/* * */

const inter = Inter({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['400', '500', '600', '700', '800'],
});

/* * */

export const metadata: Metadata = {
	description: 'Horários e Paragens em Tempo Real',
	metadataBase: process.env.NEXT_PUBLIC_URL ? new URL(process.env.NEXT_PUBLIC_URL) : new URL(`http://localhost:${process.env.PORT || 3000}`),
	title: 'CMetropolitana',
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
				<meta content="transparent" name="theme-color" />
			</head>
			<body>
				<NextIntlClientProvider formats={availableFormats} locale={locale} messages={messages}>
					<NuqsAdapter>
						<PrivacyProviders>
							{children}
						</PrivacyProviders>
					</NuqsAdapter>
				</NextIntlClientProvider>
			</body>
		</html>
	);

	//
}
