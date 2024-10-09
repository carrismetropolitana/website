/* * */

import { availableLocales, enabledLocaleAliases } from '@/i18n/config';
import { nextIntlRouting } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

/* * */

const intlMiddleware = createIntlMiddleware(nextIntlRouting);

/* * */

export default function middleware(req: NextRequest) {
	//

	//
	// First, we need to check if the URL is a static asset or an API route.
	// If it is, we can return early and let the request continue as normal (without the next-intl plugin intervention).
	// Please keep the regex in the negative condition (it is not a static asset or an API route) to match what is commonly used in the plugin docs.

	const pathnameIsNotStaticAssetOrApiRoute = new RegExp(/^(?!\/api)(?!\/_next)(?!\/_vercel)(?!.*\.).*$/).test(req.nextUrl.pathname);
	if (!pathnameIsNotStaticAssetOrApiRoute) return;

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
	// redirect to the default locale by removing the 'UNKNOWN' keyword from the URL.

	if (possibleLocaleCode === 'UNKNOWN') {
		const destinationUrl = new URL(newPathWithoutPossibleLocaleCode, req.nextUrl.origin);
		if (req.nextUrl.search) {
			destinationUrl.search = req.nextUrl.search;
		}
		return NextResponse.redirect(destinationUrl);
	}

	//
	// If the locale is any of the enabled alias, then we must redirect
	// to the corresponding 'offical' locale code.

	if (enabledLocaleAliases.includes(possibleLocaleCode)) {
		const correspondingLocaleCode = availableLocales.find(item => item.alias.includes(possibleLocaleCode))?.value;
		const destinationUrl = new URL(`${correspondingLocaleCode}${newPathWithoutPossibleLocaleCode}`, req.nextUrl.origin);
		if (req.nextUrl.search) {
			destinationUrl.search = req.nextUrl.search;
		}
		return NextResponse.redirect(destinationUrl);
	}

	//
	// If the locale is any of the enabled locale codes, or something else entirely
	// (like a real route, ex. "/lines/1234") then we can let the intlMiddleware handle it.

	return intlMiddleware(req);

	//
}
