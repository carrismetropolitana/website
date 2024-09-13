/* * */

import '@/themes/reset.css';
import '@/themes/variables.css';

/* * */

import { ColorSchemeScript } from '@mantine/core';
import { Inter } from 'next/font/google';

import Providers from './providers';

/* * */

const inter = Inter({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['500', '600', '700'],
});

/* * */

export const metadata = {
	description: 'Horários e Paragens',
	metadataBase: process.env.VERCEL_URL ? new URL(`https://${process.env.VERCEL_URL}`) : new URL(`http://0.0.0.0:${process.env.PORT || 3000}`),
	title: 'Carris Metropolitana',
};

/* * */

export default function RootLayout({ children }) {
	return (
		<html className={inter.variable}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
