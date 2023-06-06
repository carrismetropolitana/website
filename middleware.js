import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { availableLocales } from './translations/config';

const publicPages = ['/', '/auth/signin', '/auth/verify', '/auth/error'];

const intlMiddleware = createIntlMiddleware({
  locales: availableLocales,
  defaultLocale: 'en',
});

// Note that this callback is only invoked if
// the `authorized` callback has returned `true`
// and not for pages listed in `pages`.
const authMiddleware = withAuth((req) => intlMiddleware(req));

export default function middleware(req) {
  const publicPathnameRegex = RegExp(`^(/(${availableLocales.join('|')}))?(${publicPages.join('|')})?/?$`, 'i');
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return authMiddleware(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
