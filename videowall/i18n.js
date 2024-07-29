/* * */

import { getRequestConfig } from 'next-intl/server';

/* * */

export default getRequestConfig(async ({ locale }) => ({
	formats: {
		number: {
			currency_euro: {
				currency: 'EUR',
				currencySign: 'standard',
				style: 'currency',
			},
			kilometers: {
				maximumFractionDigits: 2,
				style: 'unit',
				unit: 'kilometer',
				unitDisplay: 'short',
			},
			percentage: {
				maximumFractionDigits: 2,
				style: 'unit',
				unit: 'percent',
			},
		},
	},
	messages: (await import(`./translations/${locale}.json`)).default,
}));
