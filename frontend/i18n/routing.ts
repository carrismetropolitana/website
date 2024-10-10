// /* * */

// import { defaultLocaleCode, enabledLocaleAliases, enabledLocaleCodes } from '@/i18n/config';
// import { Routes } from '@/utils/routes';
// import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
// import { defineRouting } from 'next-intl/routing';

export { default as Link } from 'next/link';
export { redirect as redirect } from 'next/navigation';
export { usePathname as usePathname } from 'next/navigation';
export { useRouter as useRouter } from 'next/navigation';
export { useParams as useParams } from 'next/navigation';

// /* * */

// const intlPathnames = Object.entries(Routes).reduce(
// 	(acc: Record<string, Record<string, string>>, [, value]) => {
// 		if (typeof value === 'object' && 'route' in value && 'intl' in value) {
// 			const translatedPathnames = value['intl'] as Record<string, string>;
// 			acc[value['route']] = translatedPathnames;

// 			// Check if any of the available locales is in translatedPathnames
// 			// If not, add the default locale
// 			for (const localeCode of [...enabledLocaleCodes, ...enabledLocaleAliases]) {
// 				if (!(localeCode in translatedPathnames)) {
// 					acc[value['route']][localeCode] = value['route'];
// 				}
// 			}
// 		}
// 		return acc;
// 	},
// 	{},
// );

// // export const nextIntlRouting = defineRouting({
// // 	defaultLocale: defaultLocaleCode,
// // 	localePrefix: 'as-needed',
// // 	locales: enabledLocaleCodes,
// // 	pathnames: {
// // 		...intlPathnames,
// // 	},
// // });

// /* * */

// // export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation(nextIntlRouting);
