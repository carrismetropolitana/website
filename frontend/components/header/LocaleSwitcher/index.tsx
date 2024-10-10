'use client';

/* * */

import { defaultLocaleCode, enabledLocaleCodes } from '@/i18n/config';
import { getUserLocale, setUserLocale } from '@/i18n/locale';
import { SegmentedControl } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useTransition } from 'react';

import styles from './styles.module.css';

/* * */

export function LocaleSwitcher() {
	//

	//
	// A. Setup variables

	const t = useTranslations('header.LocaleSwitcher');
	const [, startTransition] = useTransition();
	const [currentLocale, setCurrentLocale] = useState(defaultLocaleCode);

	//
	// B. Fetch data

	useEffect(() => {
		(async () => {
			const locale = await getUserLocale();
			setCurrentLocale(locale);
		})();
	}, []);

	//
	// C. Transform data

	const availableLocalesFormatted = enabledLocaleCodes.map(locale => ({
		label: t(`${locale}.label`),
		value: locale,
	}));

	//
	// D. Handle actions

	const handleLocaleChange = (value: string) => {
		startTransition(() => {
			try {
				setUserLocale(value);
				setCurrentLocale(value);
			}
			catch (error) {
				console.error(error);
			}
		});
	};

	//
	// E. Render Components

	return (
		<SegmentedControl
			classNames={{ innerLabel: styles.innerLabel }}
			data={availableLocalesFormatted}
			onChange={handleLocaleChange}
			size="xs"
			value={currentLocale}
			w="100%"
		/>
	);

	//
}
