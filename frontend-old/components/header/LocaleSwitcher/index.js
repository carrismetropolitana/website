/* * */

import { availableLocalesTest } from '@/i18n/config';
import { SegmentedControl } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendHeaderLocaleSwitcher');

	//
	// B. Transform data

	const availableLocalesFormatted = availableLocalesTest.map(locale => ({ label: t(`${locale}.label`), value: locale }));

	//
	// B. Render Components

	return (
		<SegmentedControl classNames={{ innerLabel: styles.innerLabel }} data={availableLocalesFormatted} size="xs" w="100%" />
	);

	//
}
