/* * */

import type { Formats } from 'next-intl';

/* * */

export const defaultLocaleCode = 'pt-PT';

export const availableLocales = [
	{ alias: ['pt', 'pt-BR', 'pt_BR', 'pt-GW', 'pt_GW', 'pt-MZ', 'pt_MZ', 'en_US', 'en-US'], enabled: true, value: 'pt-PT' },
	{ alias: [], enabled: false, value: 'en' },
];

export const enabledLocaleCodes = availableLocales.filter(item => item.enabled).map(({ value }) => value);

export const enabledLocaleAlias = availableLocales.filter(item => item.enabled).flatMap(({ alias }) => alias);

export const allEnabledLocaleCodesAndAlias = [...enabledLocaleCodes, ...enabledLocaleAlias];

/* * */

export const availableFormats: Partial<Formats> = {
	dateTime: {
		dayLong: {
			day: '2-digit',
		},
		dayShort: {
			day: 'numeric',
		},
		monthLong: {
			month: 'long',
		},
		monthShort: {
			month: 'short',
		},
		yearLong: {
			year: 'numeric',
		},
		yearShort: {
			year: '2-digit',
		},
	},
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
};
