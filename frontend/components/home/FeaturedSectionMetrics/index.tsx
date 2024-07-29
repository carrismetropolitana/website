'use client';

/* * */

import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('FeaturedSectionMetrics');

	//
	// B. Fetch data

	const { data: metricsData, error: metricsError } = useSWR('https://api.carrismetropolitana.pt/metrics/demand/by_day');

	//
	// C. Transform data

	const todayTotal = useMemo(() => {
		if (!metricsData) return null;
		let todayOperationalDay: string;
		if (DateTime.now().setZone('Europe/Lisbon').get('hour') < 4) {
			todayOperationalDay = DateTime.now().setZone('Europe/Lisbon').minus({ days: 1 }).toFormat('yyyyLLdd');
		}
		else {
			todayOperationalDay = DateTime.now().setZone('Europe/Lisbon').toFormat('yyyyLLdd');
		}
		return metricsData?.find(day => day.operational_day === todayOperationalDay)?.total_qty;
	}, [metricsData]);

	//
	// D. Render Components

	return (
		<div className={styles.container}>
			<p>{t('total_today.label')}</p>
			<p>{t('total_today.value', { value: todayTotal })}</p>

		</div>
	);

	//
}
