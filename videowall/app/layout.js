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
  weight: ['400', '600', '900'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: process.env.VERCEL_URL ? new URL(`https://${process.env.VERCEL_URL}`) : new URL(`http://0.0.0.0:${process.env.PORT || 3000}`),
  title: 'Earth › João',
  description: 'Hey! I`m João de Vasconcelos. Come take a look at my work :)',
};

/* * */

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/lsv4vby.css" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
