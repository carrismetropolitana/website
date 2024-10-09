/* * */

import { availableFormats, defaultLocaleCode } from '@/i18n/config';
import { nextIntlRouting } from '@/i18n/routing';
import { getRequestConfig } from 'next-intl/server';

/* * */

export default getRequestConfig(async ({ locale }) => {
	//

	//
	// Get messages for the given locale

	let translationMessages;

	if (!nextIntlRouting.locales.includes(locale)) {
		translationMessages = (await import(`/i18n/translations/${defaultLocaleCode}.json`)).default;
	}
	else {
		translationMessages = (await import(`/i18n/translations/${locale}.json`)).default;
	}

	//
	// Return the request configuration

	return {
		formats: availableFormats,
		messages: translationMessages,
	};

	//
});
