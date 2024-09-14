/* * */

import { availableLocales, enabledLocaleAlias } from '@/i18n/config';
import { nextIntlRouting } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

/* * */

const intlMiddleware = createIntlMiddleware(nextIntlRouting);

/* * */

export default function middleware(req: NextRequest) {
	//

	//
	// Split the URL into segments. The locale should be the first segment after the first slash.
	// The first segment might not be the locale, so we need to check if it's a valid locale code.

	const urlSegments = req.nextUrl.pathname.split('/');
	const possibleLocaleCode = urlSegments[1];

	const newPathWithoutPossibleLocaleCode = urlSegments.filter((_, index) => index !== 1).join('/');

	//
	// Our goal is to intercept the locale before the `createIntlMiddleware` middleware.
	// We want to match any known locale code, as well as any alias for a known locale code.
	// We also want to match the 'UKNOWN' locale code, which is used to handle the case where
	// the locale was not known at URL build time (for example in the app or other supports).

	//
	// If the locale is the 'UNKNOWN' keyword, then we can with confidence
	// redirect to the default locale by remove the 'UNKNOWN' keyword from the URL.

	if (possibleLocaleCode === 'UNKNOWN') {
		return NextResponse.redirect(new URL(newPathWithoutPossibleLocaleCode, req.nextUrl.origin));
	}

	//
	// If the locale is any of the enabled alias, then we must redirect
	// to the corresponding 'offical' locale code.

	if (enabledLocaleAlias.includes(possibleLocaleCode)) {
		const correspondingLocaleCode = availableLocales.find(item => item.alias.includes(possibleLocaleCode))?.value;
		return NextResponse.redirect(new URL(`${correspondingLocaleCode}${newPathWithoutPossibleLocaleCode}`, req.nextUrl.origin));
	}

	//
	// If the locale is any of the enabled locale codes, or something else entirely
	// (like a real route, ex. "/lines/1234") then we can let the intlMiddleware handle it.

	return intlMiddleware(req);

	//
}

/* * */

export const config = {
	// Matcher entries are linked with a logical "or", therefore
	// if one of them matches, the middleware will be invoked.
	matcher: [
		// Match all pathnames except for
		// - … if they start with `/api`, `/_next` or `/_vercel`
		// - … the ones containing a dot (e.g. `favicon.ico`)
		'/((?!api|_next|_vercel|.*\\..*).*)',
	],
};
