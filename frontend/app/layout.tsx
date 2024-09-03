/* * */

import { ColorSchemeScript } from '@mantine/core';
import { Inter } from 'next/font/google';

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

export default function RootLayout({ children }) {
	return (
		<html className={inter.variable}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				{children}
			</body>
		</html>
	);
}
