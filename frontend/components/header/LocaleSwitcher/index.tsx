'use client';

/* * */

import { defaultLocaleCode, enabledLocaleCodes } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/routing';
import { SegmentedControl } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

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

	//
	// B. Transform data

	const availableLocalesFormatted = enabledLocaleCodes.map(locale => ({
		label: t(`${locale}.label`),
		value: locale,
	}));

	//
	// C. Handle actions

	const handleLocaleChange = (value: string) => {
		// TODO: Keep the 'param' property. Types are wrong.
		// @ts-expect-error: Library says params should be named query, but it only works with params.
		router.replace({ params: params, pathname: pathname as string }, { locale: value, scroll: true });
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
