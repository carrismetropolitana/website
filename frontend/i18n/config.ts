/* * */

import type { Formats } from 'next-intl';

/* * */

export const availableLocales = [
	{ alias: ['pt-PT', 'pt_PT', 'pt-BR', 'pt_BR', 'pt-GW', 'pt_GW', 'pt-MZ', 'pt_MZ'], enabled: true, file: 'pt-PT', value: 'pt' },
	{ alias: ['en-US', 'en_US'], enabled: true, file: 'en-US', value: 'en' },
];

export const enabledLocaleCodes = availableLocales.filter(item => item.enabled).map(({ value }) => value);
export const enabledLocaleAliases = availableLocales.filter(item => item.enabled).flatMap(({ alias }) => alias);
export const allEnabledLocaleCodesAndAliases = [...enabledLocaleCodes, ...enabledLocaleAliases];

export const defaultLocaleCode = 'pt';
export const defaultLocaleAliases = availableLocales.find(item => item.value === defaultLocaleCode)?.alias || [];
export const defaultLocaleCodesAndAliases = [defaultLocaleCode, ...defaultLocaleAliases];

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
