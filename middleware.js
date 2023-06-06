import createIntlMiddleware from 'next-intl/middleware';
import { availableLocales } from './translations/config';

const intlMiddleware = createIntlMiddleware({
  locales: availableLocales,
  defaultLocale: 'en',
});

// Note that this callback is only invoked if
// the `authorized` callback has returned `true`
// and not for pages listed in `pages`.

export default function middleware(req) {
  return intlMiddleware(req);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
