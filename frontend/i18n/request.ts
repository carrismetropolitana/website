/* * */

import { availableFormats } from '@/i18n/config';
import { getUserLocale } from '@/i18n/locale';
import { getRequestConfig } from 'next-intl/server';

/* * */

export default getRequestConfig(async () => {
	//

	//
	// Get user best locale option

	const locale = await getUserLocale();

	console.log('LOCALE DECIDED: ', locale);

	//
	// Get messages for the given locale

	const translationMessages = (await import(`/i18n/translations/${locale}.json`)).default;

	//
	// Return the request configuration

	return {
		formats: availableFormats,
		locale: locale,
		messages: translationMessages,
	};

	//
});
