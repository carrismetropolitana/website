'use client';

/* * */

import LiveIcon from '@/components/common/LiveIcon';
import { Sparkline } from '@mantine/charts';
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

	const t = useTranslations('FeaturedSectionMetricDemand');

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

	const yesterdayTotal = useMemo(() => {
		if (!metricsData) return null;
		let yesterdayOperationalDay: string;
		if (DateTime.now().setZone('Europe/Lisbon').get('hour') < 4) {
			yesterdayOperationalDay = DateTime.now().setZone('Europe/Lisbon').minus({ days: 2 }).toFormat('yyyyLLdd');
		}
		else {
			yesterdayOperationalDay = DateTime.now().setZone('Europe/Lisbon').minus({ days: 1 }).toFormat('yyyyLLdd');
		}
		return metricsData?.find(day => day.operational_day === yesterdayOperationalDay)?.total_qty;
	}, [metricsData]);

	const weekDistribution = useMemo(() => {
		if (!metricsData) return [];
		return metricsData?.map(day => day.total_qty);
	}, [metricsData]);

	//
	// D. Render Components

	return (
		<div className={styles.container}>
			<div className={styles.metricsWrapper}>
				<div className={`${styles.rowWrapper} ${styles.primary}`}>
					<div className={styles.realtimeValueWrapper}>
						<p className={styles.value}>{t('today.value', { value: todayTotal })}</p>
						<LiveIcon color="var(--color-status-info-text)" />
					</div>
					<p className={styles.label}>{t('today.label')}</p>
				</div>
				<div className={`${styles.rowWrapper} ${styles.secondary}`}>
					<p className={styles.value}>{t('yesterday.value', { value: yesterdayTotal })}</p>
					<p className={styles.label}>{t('yesterday.label')}</p>
				</div>
			</div>
			<div className={styles.graphWrapper}>
				<Sparkline
					color="blue"
					curveType="natural"
					data={weekDistribution}
					fillOpacity={1}
					h={75}
				/>
			</div>
		</div>
	);

	//
}
