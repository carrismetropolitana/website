'use client';

/* * */

import LiveIcon from '@/components/common/LiveIcon';
import MetricsSectionDemandSkeleton from '@/components/home/MetricsSectionDemandSkeleton';
import { Routes } from '@/utils/routes';
import { LineChart, Sparkline } from '@mantine/charts';
import { ActionIcon, Popover } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component({ className }: { className?: string }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeMetricsSectionDemand');

	//
	// B. Fetch data

	const { data: metricsData } = useSWR(`${Routes.API}/metrics/demand/by_day`);

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
		return metricsData?.map(day => ({
			operational_day: DateTime.fromFormat(day.operational_day, 'yyyyLLdd').toFormat('dd/LL'),
			total_qty: day.total_qty,
		}));
	}, [metricsData]);

	//
	// D. Render Components

	if (!metricsData) {
		return <MetricsSectionDemandSkeleton />;
	}

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
						<p className={styles.value}>{t('today.value', { value: todayTotal })}</p>
						{/* <LiveIcon color="var(--color-status-info-text)" /> */}
					</div>
					<p className={styles.label}>{t('today.label')}</p>
				</div>
				{/* <div className={`${styles.rowWrapper} ${styles.secondary}`}>
					<p className={styles.value}>{t('yesterday.value', { value: yesterdayTotal })}</p>
					<p className={styles.label}>{t('yesterday.label')}</p>
				</div> */}
			</div>
			<div className={styles.graphWrapper}>
				<LineChart
					color="var(--color-brand)"
					curveType="natural"
					data={weekDistribution}
					dataKey="operational_day"
					gridAxis="none"
					h={100}
					strokeWidth={5}
					withDots={false}
					withLegend={false}
					withXAxis={false}
					withYAxis={false}
					series={[
						{
							color: 'var(--color-brand)',
							label: 'Nº de validações',
							name: 'total_qty',
						},
					]}
				/>
			</div>
		</div>
	);

	//
}
