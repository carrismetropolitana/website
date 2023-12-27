/* * */

import createIntlMiddleware from 'next-intl/middleware';
import { availableLocales } from '@/translations/config';

/* * */

const intlMiddleware = createIntlMiddleware({ locales: availableLocales, defaultLocale: 'pt', localePrefix: 'as-needed' });

/* * */

export default function middleware(req) {
  return intlMiddleware(req);
}

/* * */

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
