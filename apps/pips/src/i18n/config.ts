/* * */

import { type Formats } from 'next-intl';

/* * */

import enMessages from '@/i18n/translations/en.json';
import ptMessages from '@/i18n/translations/pt.json';

/* * */

export const availableLocales = [

	{
		_id: 'pt',
		alias: ['pt-PT', 'pt_PT', 'pt-BR', 'pt_BR', 'pt-GW', 'pt_GW', 'pt-MZ', 'pt_MZ'],
		enabled: true,
		messages: ptMessages,
	},

	{
		_id: 'en',
		alias: ['en-US', 'en_US', 'en-GB', 'en_GB'],
		enabled: true,
		messages: enMessages,
	},

];

/* * */

export const DEFAULT_LOCALE_CODE = 'pt';

export const LOCALE_STORAGE_KEY = 'locale';

/* * */

export const enabledLocales = availableLocales.filter(item => item.enabled);
export const enabledLocaleCodes = enabledLocales.filter(item => item.enabled).map(item => item._id);
export const allEnabledLocaleCodesAndAliases = enabledLocales.reduce((acc, item) => [...acc, item._id, ...item.alias], []);

export const defaultLocale = availableLocales.find(item => item._id === DEFAULT_LOCALE_CODE);

/* * */

export const getMatchingLocale = (localeCode: string) => {
	const matchingLocale = enabledLocales.find(item => item._id === localeCode || item.alias.includes(localeCode));
	if (matchingLocale) return matchingLocale;
	else return null;
};

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
