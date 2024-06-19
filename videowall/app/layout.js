/* * */

import '@/styles/reset.css';
import '@/styles/globals.css';
import '@/styles/variables.css';
import '@/styles/widths.css';

/* * */

import { Inter } from 'next/font/google';

import Providers from './providers';

/* * */

const inter = Inter({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['400', '600', '900'],
});

export const metadata = {
	description: 'Internal Carris Metropolitana dashboard',
	metadataBase: process.env.VERCEL_URL ? new URL(`https://${process.env.VERCEL_URL}`) : new URL(`http://0.0.0.0:${process.env.PORT || 3000}`),
	title: 'CM Videowall',
};

/* * */

export default function RootLayout({ children }) {
	return (
		<html className={inter.variable}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
