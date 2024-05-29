'use client';

/* * */

import { useTranslations } from 'next-intl';

import styles from './NextArrivalsEstimated.module.css';

/* * */

export default function NextArrivalsEstimated({ estimatedArrivalInMinutes }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('NextArrivalsEstimated');

	//
	// B. Render components

	if (typeof estimatedArrivalInMinutes !== 'number') return;

	if (estimatedArrivalInMinutes <= 1) return <p className={styles.container}>{t('arriving_now')}</p>;

	return <p className={styles.container}>{t('arriving_soon', { value: estimatedArrivalInMinutes })}</p>;

	//
}
