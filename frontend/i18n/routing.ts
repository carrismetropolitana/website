/* * */

import { defaultLocaleCode, enabledLocaleCodes } from '@/i18n/config';
import { Routes } from '@/utils/routes';
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

/* * */
const intlPathnames = Object.entries(Routes).reduce(
	(acc: Record<string, Record<string, string>>, [, value]) => {
		if (typeof value === 'object' && 'route' in value && 'intl' in value) {
			acc[value['route']] = value['intl'];
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
