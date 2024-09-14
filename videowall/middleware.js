/* * */

import { availableLocales } from '@/i18n/config';
import createIntlMiddleware from 'next-intl/middleware';

/* * */

const intlMiddleware = createIntlMiddleware({ defaultLocale: 'pt-PT', localePrefix: 'as-needed', locales: availableLocales });

/* * */

export default function middleware(req) {
	return intlMiddleware(req);
}

/* * */

export const config = {
	// Skip all paths that should not be internationalized
	matcher: ['/((?!api|_next|.*\\..*).*)'],
};
