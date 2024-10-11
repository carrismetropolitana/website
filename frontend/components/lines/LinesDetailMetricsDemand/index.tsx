import LiveIcon from '@/components/common/LiveIcon';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { LineChart } from '@mantine/charts';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

import styles from './styles.module.css';

export default function DemandMetrics() {
	//
	// A. Define Variables
	const t = useTranslations('lines.LinesDetailMetrics');
	const linesDetailContext = useLinesDetailContext();

	//
	// B. Transform data

	const selectedDistribution = useMemo(() => {
		if (!linesDetailContext.data.demand) return null;
		return linesDetailContext.data.demand.by_day
			.sort((a, b) => Number(a.day) - Number(b.day))
			.map(item => ({
				operationalDay: DateTime.fromFormat(item.day.toString(), 'yyyyMMdd').toFormat('dd/MM'),
				qty: item.qty,
			}));
	}, [linesDetailContext.data.demand]);

	const averageDemand = useMemo(() => {
		if (!linesDetailContext.data.demand) return 0;
		return linesDetailContext.data.demand.total_qty / linesDetailContext.data.demand.by_day.length;
	}, [linesDetailContext.data.demand]);

	//
	// C. Render components

	const renderDemandLineChart = () => {
		if (!selectedDistribution || !linesDetailContext.data.line || !linesDetailContext.data.demand) return null;

		return (
			<LineChart
				color={linesDetailContext.data.line?.color}
				curveType="natural"
				data={selectedDistribution}
				dataKey="operationalDay"
				gridAxis="none"
				h={120}
				strokeWidth={5}
				styles={{ referenceLine: { strokeDasharray: '5 5' } }}
				withDots={false}
				withLegend={false}
				withTooltip={true}
				withXAxis={false}
				withYAxis={false}
				referenceLines={[
					{
						color: 'var(--color-system-text-300)',
						label: t('demand.label'),
						labelPosition: 'insideBottomRight',
						y: averageDemand,
					},
				]}
				series={[
					{
						color: linesDetailContext.data.line?.color,
						label: t('demand.label'),
						name: 'qty',
					},
				]}
			/>
		);
	};

	const renderDemandMetric = () => {
		return (
			<div className={styles.container}>
				<div className={styles.metricWrapper}>
					<div className={styles.bigNumberWrapper}>
						<h1 className={styles.bigNumber} style={{ color: linesDetailContext.data.line?.color }}>
							{t('demand.big_number', { value: linesDetailContext.data.demand?.total_qty })}
						</h1>
						<LiveIcon className={styles.liveIcon} color={linesDetailContext.data.line?.color} />
					</div>
					<h3 className={styles.subtitle}>{t('demand.subtitle')}</h3>
				</div>
				<div className={styles.metricWrapper} />
			</div>
		);
	};

	return (
		<Surface>
			<Section withGap withPadding>
				{renderDemandMetric()}
				{renderDemandLineChart()}
			</Section>
		</Surface>
	);
};
