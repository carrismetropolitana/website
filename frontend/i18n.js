/* * */

import { availableFormats } from '@/translations/config';
import { getRequestConfig } from 'next-intl/server';

/* * */

export default getRequestConfig(async ({ locale }) => ({
	formats: availableFormats,
	messages: (await import(`./translations/${locale}.json`)).default,
}));
