//
// ROOT LAYOUT

import '@/styles/reset.css';
import '@/styles/defaults.css';
import '@/styles/colors.css';
import { Inter } from 'next/font/google';
import Providers from './providers';

const inter = Inter({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Carris Metropolitana',
  description: 'Horários e Paragens',
};

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
