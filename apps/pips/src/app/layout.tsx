/* * */

import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import { type PropsWithChildren } from 'react';

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
	description: 'Painel interior Carris Metropolitana',
	metadataBase: new URL(getPublicVariable('server_url_frontend')),
	title: 'CMetropolitana PIP',
};

/* * */

export default async function RootLayout({ children }: PropsWithChildren) {
	return (
		<html className={inter.variable}>
			<head>
				<meta content="transparent" name="theme-color" />
				<meta content="noindex, nofollow" name="robots" />
			</head>
			<body>
				{children}
			</body>
		</html>
	);
}
