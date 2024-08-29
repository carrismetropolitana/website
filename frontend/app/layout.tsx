/* * */

import '@/styles/reset.css';
import '@/styles/variables.css';

/* * */

import { ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Inter } from 'next/font/google';

import Providers from './providers';
/* * */

import '@mantine/notifications/styles.css';

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

export default function RootLayout({ children }) {
	return (
		<html className={inter.variable}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<Providers>
					<Notifications styles={{ root: { marginTop: '60px' } }} />
					{children}
				</Providers>
			</body>
		</html>
	);
}
