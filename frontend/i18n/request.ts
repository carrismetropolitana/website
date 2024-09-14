/* * */

import { defaultLocaleCode } from '@/i18n/config';
import { nextIntlRouting } from '@/i18n/routing';
import { getRequestConfig } from 'next-intl/server';

/* * */

export default getRequestConfig(async ({ locale }) => {
	if (!nextIntlRouting.locales.includes(locale)) {
		return { messages: (await import(`./${defaultLocaleCode}.json`)).default };
	}
	return { messages: (await import(`./${locale}.json`)).default };
});
