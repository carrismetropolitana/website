'use server';

/* * */

import { availableFormats, DEFAULT_LOCALE_CODE, defaultLocale } from '@/i18n/config';
import { getRequestConfig } from 'next-intl/server';

/* * */

export default getRequestConfig(async () => {
	return {
		formats: availableFormats,
		locale: DEFAULT_LOCALE_CODE,
		messages: defaultLocale.messages,
		timeZone: 'Europe/Lisbon',
	};
});
