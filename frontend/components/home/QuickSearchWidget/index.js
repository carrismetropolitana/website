'use client';

/* * */

import { SegmentedControl } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeQuickSearchWidget');

	//
	// B. Transform data

	const segmentedControlOptions = [
		{ label: t('options.lines'), value: 'lines' },
		{ label: t('options.stops'), value: 'stops' },
	];

	//
	// B. Render Components

	return (
		<div className={styles.container}>
			<div className={styles.introWrapper}>
				<h1 className={styles.introTitle}>{t('title')}</h1>
				<p className={styles.introSubtitle}>{t('subtitle')}</p>
			</div>
			<div className={styles.searchWrapper}>
				<SegmentedControl data={segmentedControlOptions} />
			</div>
		</div>
	);

	//
}
