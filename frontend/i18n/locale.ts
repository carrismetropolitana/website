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
	if (userPreferedLocale) return userPreferedLocale;

	//
	// If no locale is set, try to get the locale set on the browser using the accept-language header.

	const browserPreferedLocales = headers().get('accept-language');
	if (!browserPreferedLocales) return defaultLocaleCode;

	//
	// Parse the accept-language header to get the best locale option for the user.
	// The Accept-Language header often contains a list of locales with optional quality values (q),
	// where higher q values indicate higher preference. Split the header value and map through
	// the array to extract the language and its q-value. Sort by quality value in descending order.

	const browserPreferedLocalesSplit = browserPreferedLocales.split(',');

	const browserPreferedLocalesParsed = browserPreferedLocalesSplit.map((lang) => {
		const parts = lang.split(';q=');
		return {
			locale: parts[0].trim(),
			quality: parts[1] ? parseFloat(parts[1]) : 1.0, // Default q value is 1 if not specified
		};
	});

	browserPreferedLocalesParsed.sort((a, b) => b.quality - a.quality);

	//
	// Check if the default locale for this website is in the list of browser locales.
	// This is useful because the user can be multi-lingual and its native language is not the primary browser locale.
	// If the default locale for this website is in the list, return it. Search both for the locale code and its aliases.

	const defaultLocaleIsViableOption = browserPreferedLocalesParsed.find((lang) => {
		const isDefaultLocale = lang.locale === defaultLocaleCode;
		const isDefaultLocaleAlias = defaultLocaleCodesAndAliases.includes(lang.locale);
		return isDefaultLocale || isDefaultLocaleAlias;
	});

	if (defaultLocaleIsViableOption) return defaultLocaleIsViableOption.locale;

	//
	// If the default locale is not in the list of browser locales, check if any of the other
	// locales in the list are enabled. Remove the locales that are not enabled.
	// If the result is an empty array, return the default locale.

	const otherLocalesThatAreViableOptions = browserPreferedLocalesParsed.filter(lang => allEnabledLocaleCodesAndAliases.includes(lang.locale));
	if (!otherLocalesThatAreViableOptions.length) return defaultLocaleCode;

	//
	// From the list of available locales that are still a viable options,
	// select the locale code with the highest preference value.
	// Check if the desired locale is an alias and return the locale value instead.

	const browserPreferedLocaleWithHighestQuality = otherLocalesThatAreViableOptions[0].locale;
	const matchingLocaleConfiguration = availableLocales.find(item => item.alias.includes(browserPreferedLocaleWithHighestQuality));

	if (matchingLocaleConfiguration) return matchingLocaleConfiguration.value;

	//
	// Return the default locale if no other locale is found.

	return defaultLocaleCode;

	//
}
