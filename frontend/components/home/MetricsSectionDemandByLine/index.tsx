'use client';

/* * */

import LineBadge from '@/components/common/LineBadge';
import MetricsSectionDemandSkeleton from '@/components/home/MetricsSectionDemandSkeleton';
import { useLinesListContext } from '@/contexts/LinesList.context';
import { PieChart } from '@mantine/charts';
import { ActionIcon, Popover } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';
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
	const linesContext = useLinesListContext();

	//
	// B. Fetch data

	const { data: metricsData } = useSWR('https://api.carrismetropolitana.pt/metrics/demand/by_line');

	//
	// C. Transform data

	const topThree = useMemo(() => {
		if (!metricsData) return null;
		return metricsData.sort((a, b) => b.total_qty - a.total_qty).slice(0, 3);
	}, [metricsData]);

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
							<div className={styles.realtimeValueWrapperItem}>
								<LineBadge key={line.line_id} line={linesContext.data.raw.find(raw => raw.line_id === line.line_id)} />
							</div>
						))}
						{/* <LiveIcon color="var(--color-status-info-text)" /> */}
					</div>
					<p className={styles.label}>{t('by_line.top')}</p>
				</div>
			</div>
			<div className={styles.graphWrapper}>
				<PieChart
					className={styles.pieChart}
					labelsPosition="inside"
					labelsType="percent"
					size={125}
					tooltipDataSource="segment"
					data={[
						{ color: 'var(--color-brand)', name: topThree[0].line_id, value: topThree[0].total_qty },
						{ color: 'var(--color-status-danger-text)', name: topThree[1].line_id, value: topThree[1].total_qty },
						{ color: 'var(--color-status-info-text)', name: topThree[2].line_id, value: topThree[2].total_qty },
					]}
					withLabels
					withTooltip
				/>
			</div>
		</div>
	);

	//
}
