'use client';

/* * */

import { defaultLocaleCode, enabledLocaleCodes } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/routing';
import { SegmentedControl } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('header.LocaleSwitcher');
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	const searchParams = new URLSearchParams(window.location.search);

	const [isPending, startTransition] = useTransition();

	//
	// B. Transform data

	const availableLocalesFormatted = enabledLocaleCodes.map(locale => ({
		label: t(`${locale}.label`),
		value: locale,
	}));

	//
	// C. Handle actions

	const handleLocaleChange = (value: string) => {
		startTransition(() => {
			try {
				console.log('switching locale to', value);
				console.log('current pathname', pathname);
				console.log('current params', params);
				console.log('search params', searchParams);
				router.replace(
					// @ts-expect-error -- TypeScript will validate that only known `params`
					// are used in combination with a given `pathname`. Since the two will
					// always match for the current route, we can skip runtime checks.
					{ params, pathname, query: Object.fromEntries(searchParams.entries()) },
					{ locale: value, scroll: true },
				);
			}
			catch (error) {
				console.error(error);
			}
		});
	};

	//
	// D. Render Components

	return (
		<SegmentedControl
			classNames={{ innerLabel: styles.innerLabel }}
			data={availableLocalesFormatted}
			onChange={handleLocaleChange}
			size="xs"
			value={params.locale as string || defaultLocaleCode}
			w="100%"
		/>
	);

	//
}
