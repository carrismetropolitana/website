'use client';

/* * */

import MetricsSectionDemandSkeleton from '@/components/home/MetricsSectionDemandSkeleton';
import { MonthlyMetrics } from '@/types/metrics.types';
import { Routes } from '@/utils/routes';
import { BarChart } from '@mantine/charts';
import { ActionIcon, Popover } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import classNames from 'classnames';
import { Info } from 'luxon';
// import { DateTime } from 'luxon';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */
interface Props {
	chartHeight?: number
	className?: string
}

export default function Component({ chartHeight = 100, className }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeMetricsSectionDemand');
	// const tCommon = useTranslations('common');

	//
	// B. Fetch data

	const { data: metricsData } = useSWR<MonthlyMetrics[]>(`${Routes.API}/metrics/demand/by_month`);

	//
	// C. Transform data

	const totalTrips = useMemo(() => {
		if (!metricsData) return null;
		return metricsData.reduce((acc, month) => acc + month.count, 0);
	}, [metricsData]);

	// const lastMonth = useMemo(() => {
	// 	if (!metricsData) return null;
	// 	const datenow = DateTime.now();
	// 	const lastMonth = datenow.minus({ months: 1 });
	// 	return metricsData.find(month => month.year === lastMonth.year && month.month === lastMonth.month);
	// }, [metricsData]);

	const distribution = useMemo(() => {
		if (!metricsData) return [];
		return metricsData.map(month => ({
			month: Info.months('long')[month.month - 1].toLowerCase(),
			p40: month.count * 0.4,
			p60: month.count * 0.6,
			p80: month.count * 0.8,
			p100: month.count,
		}));
	}, [metricsData]);

	//
	// D. Render Components

	if (!metricsData) {
		return <MetricsSectionDemandSkeleton />;
	}

	// const renderLastMonth = () => {
	// 	if (!lastMonth) return null;
	// 	const month = Info.months('long')[lastMonth.month - 1].toLowerCase();
	// 	return (
	// 		<div className={`${styles.rowWrapper} ${styles.secondary}`}>
	// 			<p className={styles.value}>{t('lastMonth.value', { value: lastMonth.count })}</p>
	// 			<p className={styles.label}>{t('lastMonth.label', { month: tCommon(`month.${month}`) })}</p>
	// 		</div>
	// 	);
	// };

	return (
		<div className={classNames(styles.container, className)}>
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
						{/* <LiveIcon color="var(--color-status-info-text)" /> */}
					</div>
					<p className={styles.label}>{t('yearToDate.label')}</p>
				</div>
				{/* <div className={`${styles.rowWrapper} ${styles.secondary}`}>
					{ renderLastMonth() }
				</div>
			</div> */}
				<div className={styles.graphWrapper}>
					<BarChart
						classNames={{ root: styles.barChartRoot }}
						color="var(--color-status-info-text)"
						data={distribution}
						dataKey="month"
						fillOpacity={1}
						gridAxis="none"
						h={chartHeight}
						style={{ height: '100%' }}
						type="stacked"
						withBarValueLabel={false}
						withLegend={false}
						withTooltip={false}
						withXAxis={false}
						withYAxis={false}
						series={[
							{ color: 'rgba(255, 255, 255, 0.4)', name: 'p40' },
							{ color: 'rgba(255, 255, 255, 0.60)', name: 'p60' },
							{ color: 'rgba(255, 255, 255, 0.80)', name: 'p80' },
							{ color: 'rgba(255, 255, 255, 0.95)', name: 'p100' },
						]}
					/>
				</div>
			</div>
		</div>
	);

	//
}
