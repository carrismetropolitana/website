'use client';

/* * */

import LineBadge from '@/components/common/LineBadge';
import MetricsSectionDemandSkeleton from '@/components/home/MetricsSectionDemandSkeleton';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { Routes } from '@/utils/routes';
import { Sparkline } from '@mantine/charts';
import { ActionIcon, Popover } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import classNames from 'classnames';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeMetricsSectionDemand');
	const linesContext = useLinesListContext();
	const [selectedLineId, setSelectedLineId] = useState<string | undefined>();

	//
	// B. Fetch data

	const { data: metricsData } = useSWR(`${Routes.API}/metrics/demand/by_line`);

	//
	// C. Transform data

	const topThree = useMemo(() => {
		if (!metricsData) return null;
		const top = metricsData.sort((a, b) => b.total_qty - a.total_qty).slice(0, 3);
		setSelectedLineId(top[0].line_id);
		return top;
	}, [metricsData]);

	const selectedValue = useMemo(() => {
		if (!metricsData) return null;
		return metricsData.find(line => line.line_id === selectedLineId)?.total_qty.toLocaleString('en', { useGrouping: true }).replace(/,/g, ' ');
	}, [metricsData, selectedLineId]);

	const selectedDistribution = useMemo(() => {
		if (!metricsData) return null;
		return metricsData.find(line => line.line_id === selectedLineId)?.by_hour.map(hour => hour.qty);
	}, [metricsData, selectedLineId]);

	//
	// D. Render Components

	if (!metricsData) {
		return <MetricsSectionDemandSkeleton />;
	}

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
						{topThree.map(line => (
							<div key={line.line_id} className={classNames(styles.realtimeValueWrapperItem, { [styles.selected]: line.line_id === selectedLineId })} onClick={() => setSelectedLineId(line.line_id)}>
								<LineBadge key={line.line_id} line={linesContext.data.raw.find(raw => raw.line_id === line.line_id)} />
							</div>
						))}
						{/* <LiveIcon color="var(--color-status-info-text)" /> */}
					</div>
					<p className={styles.label}>{t('by_line.top')}</p>
				</div>
				<div className={`${styles.rowWrapper} ${styles.secondary}`}>
					<p className={styles.value}>{selectedValue}</p>
					<p className={styles.label}>{t('by_line.selected')}</p>
				</div>
			</div>
			<div className={styles.graphWrapper}>
				<Sparkline
					color="var(--color-status-info-text)"
					curveType="natural"
					data={selectedDistribution}
					fillOpacity={1}
					h={75}
				/>
			</div>
		</div>
	);

	//
}
