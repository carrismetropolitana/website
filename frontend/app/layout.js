//
// ROOT LAYOUT

import '@/styles/reset.css';
import '@/styles/defaults.css';
import '@/styles/colors.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import AppWrapper from '@/components/AppWrapper/AppWrapper';
import AppTopBar from '@/components/AppTopBar/AppTopBar';
import AppHeader from '@/components/AppHeader/AppHeader';
import AppFooter from '@/components/AppFooter/AppFooter';

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
        <Providers>
          <AppWrapper>
            <AppTopBar />
            <AppHeader />
            {children}
            <AppFooter />
          </AppWrapper>
        </Providers>
      </body>
    </html>
  );
}
