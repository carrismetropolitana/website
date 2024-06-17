/* * */

import { availableLocales } from '@/translations/config';
import createIntlMiddleware from 'next-intl/middleware';

/* * */

const intlMiddleware = createIntlMiddleware({ defaultLocale: 'pt', localePrefix: 'as-needed', locales: availableLocales });

/* * */

export default function middleware(req) {
	return intlMiddleware(req);
}

/* * */

export const config = {
	// Skip all paths that should not be internationalized
	matcher: ['/((?!api|_next|.*\\..*).*)'],
};