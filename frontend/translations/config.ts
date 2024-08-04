/* * */

import type { Formats } from 'next-intl';

/* * */

export const availableLocales = ['pt-PT'];

export const availableLocalesTest = ['pt', 'en', 'fr'];

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
};
