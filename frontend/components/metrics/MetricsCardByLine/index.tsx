'use client';

/* * */

import MetricsSectionDemandSkeleton from '@/components/home/MetricsSectionDemandSkeleton';
import LineBadge from '@/components/lines/LineBadge';
import { useLinesContext } from '@/contexts/Lines.context';
import { Routes } from '@/utils/routes';
import { LineChart } from '@mantine/charts';
import { ActionIcon, Popover, useComputedColorScheme } from '@mantine/core';
import { IconInfoCircleFilled } from '@tabler/icons-react';
import classNames from 'classnames';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component({
	className,
	showGraph = true,
}: {
	className?: string
	showGraph?: boolean
}) {
	//

	//
	// A. Setup variables

	const t = useTranslations('HomeMetricsSectionDemand');
	const linesContext = useLinesContext();
	const [selectedLineId, setSelectedLineId] = useState<string | undefined>();
	const colorScheme = useComputedColorScheme();

	//
	// B. Fetch data

	const { data: metricsData } = useSWR(
		`${Routes.API}/metrics/demand/by_line`,
	);

	//
	// C. Transform data

	const topThree = useMemo(() => {
		if (!metricsData) return null;
		const top = metricsData
			.sort((a, b) => b.total_qty - a.total_qty)
			.slice(0, 3);

		console.log('========>', top[0]);
		setSelectedLineId(top[0]?.line_id || '');
		return top;
	}, [metricsData]);

	const selectedValue = useMemo(() => {
		if (!metricsData) return null;
		return metricsData
			.find(line => line.line_id === selectedLineId)
			?.total_qty.toLocaleString('en', { useGrouping: true })
			.replace(/,/g, ' ');
	}, [metricsData, selectedLineId]);

	const selectedDistribution = useMemo(() => {
		if (!metricsData) return null;
		const metrics = metricsData.find(
			line => line.line_id === selectedLineId,
		)?.by_hour;
		if (!metrics) return null;
		return metrics
			.sort((a, b) => a.hour - b.hour)
			.map(item => ({
				hour:
					(item.hour.toString().length === 1 ? '0' : '')
					+ item.hour
					+ ':00',
				qty: item.qty,
			}));
	}, [metricsData, selectedLineId]);

	//
	// D. Render Components

	if (!metricsData) {
		return <MetricsSectionDemandSkeleton />;
	}

	return (
		<div
			className={classNames(
				styles.container,
				{ [styles.light]: colorScheme === 'light' },
				className,
			)}
		>
			<Popover
				offset={0}
				position="top-end"
				shadow="md"
				width={300}
				withArrow
			>
				<Popover.Target>
					<ActionIcon
						className={styles.popoverAnchor}
						size="xs"
						variant="transparent"
					>
						<IconInfoCircleFilled />
					</ActionIcon>
				</Popover.Target>
				<Popover.Dropdown>
					<p className={styles.popoverText}>{t('popover.text')}</p>
					<Link
						className={styles.popoverLink}
						href="/open-data"
						target="_blank"
					>
						{t('popover.link')}
					</Link>
				</Popover.Dropdown>
			</Popover>
			<div className={styles.metricsWrapper}>
				<div className={`${styles.rowWrapper} ${styles.primary}`}>
					<div className={styles.realtimeValueWrapper}>
						{topThree.map(line => (
							<div
								key={line.id}
								onClick={() => setSelectedLineId(line.id)}
								className={classNames(
									styles.realtimeValueWrapperItem,
									{
										[styles.selected]:
											line.id === selectedLineId,
									},
								)}
							>
								<LineBadge
									key={line.id}
									line={linesContext.data.lines.find(
										raw => raw.id === line.id,
									)}
								/>
							</div>
						))}
						{/* <LiveIcon color="var(--color-status-info-text)" /> */}
					</div>
					<p className={styles.label}>{t('by_line.top')}</p>
				</div>
				{/* <div className={`${styles.rowWrapper} ${styles.secondary}`}>
					<p className={styles.value}>{selectedValue}</p>
					<p className={styles.label}>{t('by_line.selected')}</p>
				</div> */}
			</div>
			{showGraph && (
				<div className={styles.graphWrapper}>
					<LineChart
						curveType="natural"
						data={selectedDistribution}
						dataKey="hour"
						gridAxis="none"
						h={80}
						strokeWidth={5}
						withDots={false}
						withLegend={false}
						withXAxis={false}
						withYAxis={false}
						color={
							linesContext.data.lines.find(
								line => line.id === selectedLineId,
							)?.color || '#ff00ff'
						}
						series={[
							{
								color:
									linesContext.data.lines.find(
										line =>
											line.id === selectedLineId,
									)?.color || '#ff00ff',
								label: 'Nº de passageniros transportados',
								name: 'qty',
							},
						]}
					/>
				</div>
			)}
		</div>
	);

	//
}
