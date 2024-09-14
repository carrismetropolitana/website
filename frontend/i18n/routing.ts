/* * */

import { defaultLocaleCode, enabledLocaleCodes } from '@/i18n/config';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

/* * */

export const nextIntlRouting = defineRouting({
	defaultLocale: defaultLocaleCode,
	localePrefix: 'as-needed',
	locales: enabledLocaleCodes,
});

/* * */

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(nextIntlRouting);
