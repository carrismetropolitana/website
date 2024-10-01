/* * */

import { availableLocales, defaultLocaleCode, enabledLocaleCodes } from '@/i18n/config';
import { Routes } from '@/utils/routes';
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

/* * */
const intlPathnames = Object.entries(Routes).reduce(
	(acc: Record<string, Record<string, string>>, [, value]) => {
		if (typeof value === 'object' && 'route' in value && 'intl' in value) {
			const translatedPathnames = value['intl'] as Record<string, string>;
			acc[value['route']] = translatedPathnames;

			// Check if any of the available locales is not in translatedPathnames
			// If not, add the default locale
			for (const locale of availableLocales) {
				if (locale.enabled && !(locale.value in translatedPathnames)) {
					acc[value['route']][locale.value] = value['route'];
				}
			}
		}
		return acc;
	},
	{},
);

export const nextIntlRouting = defineRouting({
	defaultLocale: defaultLocaleCode,
	localePrefix: 'as-needed',
	locales: enabledLocaleCodes,
	pathnames: {
		...intlPathnames,
	},
});

/* * */

export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation(nextIntlRouting);
