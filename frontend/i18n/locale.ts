'use server';

/* * */

import { allEnabledLocaleCodesAndAliases, availableLocales, defaultLocaleCode, defaultLocaleCodesAndAliases } from '@/i18n/config';
import { cookies, headers } from 'next/headers';

/* * */

const COOKIE_NAME = 'NEXT_LOCALE';

/* * */

export async function setUserLocale(locale) {
	cookies().set(COOKIE_NAME, locale);
}

/* * */

export async function getUserLocale() {
	//

	//
	// Read the cookie to retrieve the prefered locale setting fot the user.

	const userPreferedLocale = cookies().get(COOKIE_NAME)?.value;
	const userPreferedLocaleMatched = userPreferedLocale && availableLocales.find(item => item.alias.includes(userPreferedLocale));
	if (userPreferedLocaleMatched) {
		console.log('1. LOCALE FROM COOKIE: ', userPreferedLocaleMatched);
		return userPreferedLocaleMatched.value;
	}

	//
	// If no locale is set, try to get the locale set on the browser using the accept-language header.

	const browserPreferedLocales = headers().get('accept-language');
	if (!browserPreferedLocales) {
		console.log('2. NO LOCALE FROM COOKIE OR BROWSER', defaultLocaleCode);
		return defaultLocaleCode;
	}

	//
	// Parse the accept-language header to get the best locale option for the user.
	// The Accept-Language header often contains a list of locales with optional quality values (q),
	// where higher q values indicate higher preference. Split the header value and map through
	// the array to extract the language and its q-value. Sort by quality value in descending order.
	// Since we want to eventually return the locale code, we need to check if the locale is an alias
	// and return the alias corresponding value instead.

	const browserPreferedLocalesSplit = browserPreferedLocales.split(',');

	const browserPreferedLocalesParsed = browserPreferedLocalesSplit.map((lang) => {
		const parts = lang.split(';q=');
		return {
			locale: parts[0].trim(),
			quality: parts[1] ? parseFloat(parts[1]) : 1.0, // Default q value is 1 if not specified
		};
	});

	const browserPreferedLocalesMatched = browserPreferedLocalesParsed
		.map((lang) => {
			const matchingLocaleConfiguration = availableLocales.find(item => item.alias.includes(lang.locale));
			if (matchingLocaleConfiguration) {
				return {
					...lang,
					locale: matchingLocaleConfiguration.value,
				};
			}
		})
		.filter(lang => !!lang)
		.sort((a, b) => b.quality - a.quality);

	//
	// Check if the default locale for this website is in the list of browser locales.
	// This is useful because the user can be multi-lingual and its native language is not the primary browser locale.
	// If the default locale for this website is in the list, return it. Search both for the locale code and its aliases.

	const defaultLocaleIsViableOption = browserPreferedLocalesMatched.find((lang) => {
		const isDefaultLocale = lang.locale === defaultLocaleCode;
		const isDefaultLocaleAlias = defaultLocaleCodesAndAliases.includes(lang.locale);
		return isDefaultLocale || isDefaultLocaleAlias;
	});

	if (defaultLocaleIsViableOption) {
		console.log('3. LOCALE FROM BROWSER: ', defaultLocaleIsViableOption.locale);
		return defaultLocaleIsViableOption.locale;
	}

	//
	// If the default locale is not in the list of browser locales, check if any of the other
	// locales in the list are enabled. Remove the locales that are not enabled.
	// If the result is an empty array, return the default locale.

	const otherLocalesThatAreViableOptions = browserPreferedLocalesMatched.filter(lang => allEnabledLocaleCodesAndAliases.includes(lang.locale));
	if (!otherLocalesThatAreViableOptions.length) {
		console.log('4. NO LOCALE FROM COOKIE OR BROWSER', defaultLocaleCode);
		return defaultLocaleCode;
	}

	//
	// From the list of available locales that are still a viable options,
	// select the locale code with the highest preference value.

	const browserPreferedLocaleWithHighestQuality = otherLocalesThatAreViableOptions[0].locale;
	if (browserPreferedLocaleWithHighestQuality) {
		console.log('5. LOCALE FROM BROWSER: ', browserPreferedLocaleWithHighestQuality);
		return browserPreferedLocaleWithHighestQuality;
	}

	//
	// Return the default locale if no other locale is found.

	console.log('6. NO LOCALE FROM COOKIE OR BROWSER', defaultLocaleCode);
	return defaultLocaleCode;

	//
}
