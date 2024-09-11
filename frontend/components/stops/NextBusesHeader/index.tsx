'use client';

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

export default function NextBusesHeader() {
	//

	//
	// A. Setup variables

	const t = useTranslations('stops.NextBusesHeader');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.column}>{t('line')}</div>
			<div className={styles.column}>{t('headsign')}</div>
			<div className={styles.column}>{t('estimate')}</div>
		</div>
	);
}
