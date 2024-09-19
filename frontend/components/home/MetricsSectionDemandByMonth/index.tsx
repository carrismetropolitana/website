'use client';

/* * */

import LiveIcon from '@/components/common/LiveIcon';
import MetricsSectionDemandSkeleton from '@/components/home/MetricsSectionDemandSkeleton';
import { MonthlyMetrics } from '@/types/metrics.types';
import { Sparkline } from '@mantine/charts';
import { ActionIcon, Popover } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import { DateTime, Info } from 'luxon';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeMetricsSectionDemand');
	const tCommon = useTranslations('common');

	//
	// B. Fetch data

	const { data: metricsData } = useSWR<MonthlyMetrics[]>('https://api.carrismetropolitana.pt/metrics/demand/by_month');

	//
	// C. Transform data

	const totalTrips = useMemo(() => {
		if (!metricsData) return null;
		return metricsData.reduce((acc, month) => acc + month.count, 0);
	}, [metricsData]);

	const lastMonth = useMemo(() => {
		if (!metricsData) return null;
		const datenow = DateTime.now();
		const lastMonth = datenow.minus({ months: 1 });
		return metricsData.find(month => month.year === lastMonth.year && month.month === lastMonth.month);
	}, [metricsData]);

	const distribution = useMemo(() => {
		if (!metricsData) return [];
		return metricsData.map(month => month.count);
	}, [metricsData]);

	//
	// D. Render Components

	if (!metricsData) {
		return <MetricsSectionDemandSkeleton />;
	}

	const renderLastMonth = () => {
		if (!lastMonth) return null;
		const month = Info.months('long')[lastMonth.month - 1].toLowerCase();
		return (
			<div className={`${styles.rowWrapper} ${styles.secondary}`}>
				<p className={styles.value}>{t('lastMonth.value', { value: lastMonth.count })}</p>
				<p className={styles.label}>{t('lastMonth.label', { month: tCommon(`month.${month}`) })}</p>
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<Popover offset={0} position="top-end" shadow="md" width={300} withArrow>
				<Popover.Target>
					<ActionIcon className={styles.popoverAnchor} size="xs" variant="transparent">
						<IconInfoCircleFilled />
					</ActionIcon>
				</Popover.Target>
				<Popover.Dropdown>
					<p className={styles.popoverText}>{t('popover.text')}</p>
					<Link className={styles.popoverLink} href="/open-data" target="_blank">{t('popover.link')}</Link>
				</Popover.Dropdown>
			</Popover>
			<div className={styles.metricsWrapper}>
				<div className={`${styles.rowWrapper} ${styles.primary}`}>
					<div className={styles.realtimeValueWrapper}>
						<p className={styles.value}>{t('today.value', { value: totalTrips })}</p>
						<LiveIcon color="var(--color-status-info-text)" />
					</div>
					<p className={styles.label}>{t('yearToDate.label')}</p>
				</div>
				<div className={`${styles.rowWrapper} ${styles.secondary}`}>
					{ renderLastMonth() }
				</div>
			</div>
			<div className={styles.graphWrapper}>
				<Sparkline
					color="var(--color-status-info-text)"
					curveType="natural"
					data={distribution}
					fillOpacity={1}
					h={75}
				/>
			</div>
		</div>
	);

	//
}
