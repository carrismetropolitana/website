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

	const last15DaysService = useMemo(() => {
		if (!linesDetailContext.data.service) return [];
		linesDetailContext.data.service.sort((a, b) => Number(b.operationalDay) - Number(a.operationalDay));
		return linesDetailContext.data.service.slice(0, 15);
	}, [linesDetailContext.data.service]);

	const service15dayAverage = useMemo(() => {
		if (!last15DaysService) return 0;

		const { passTripCount, totalTripCount } = last15DaysService.reduce((acc, curr) => ({
			passTripCount: acc.passTripCount + Number(curr.passTripCount),
			totalTripCount: acc.totalTripCount + Number(curr.totalTripCount),
		}), { passTripCount: 0, totalTripCount: 0 });

		return (passTripCount / totalTripCount) * 100;
	}, [last15DaysService]);

	const service15DayDistribution = useMemo(() => {
		if (!last15DaysService) return [];

		return last15DaysService.map(service => ({
			operationalDay: DateTime.fromFormat(service.operationalDay, 'yyyyMMdd').toFormat('dd/MM'),
			percentage: Number(((Number(service.passTripCount) / Number(service.totalTripCount)) * 100).toFixed(2)),
		}));
	}, [last15DaysService]);

	//
	// C. Render components

	const renderLineChart = () => {
		if (!linesDetailContext.data.line) return null;

		return (
			<LineChart
				color={linesDetailContext.data.line.color}
				curveType="natural"
				data={service15DayDistribution}
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
					{ color: 'var(--color-system-text-300)', label: '50%', labelPosition: 'insideBottomRight', y: 50 },
					{ color: 'var(--color-system-text-300)', label: '100%', labelPosition: 'insideBottomRight', y: 100 },
				]}
				series={[
					{
						color: linesDetailContext.data.line.color,
						label: t('service.label'),
						name: 'percentage',
					},
				]}
			/>
		);
	};

	const renderServiceMetric = () => {
		if (!linesDetailContext.data.line) return null;

		return (
			<div className={styles.container}>
				<div className={styles.metricWrapper}>
					<div className={styles.bigNumberWrapper}>
						<h1 className={styles.bigNumber} style={{ color: linesDetailContext.data.line.color }}>{t('service.big_number', { value: service15dayAverage })}</h1>
						<LiveIcon className={styles.liveIcon} color={linesDetailContext.data.line.color} />
					</div>
					<h3 className={styles.subtitle}>{t('service.subtitle')}</h3>
					{/* <h3 className={styles.description}>{t('service.description')}</h3> */}
				</div>
				<div className={styles.metricWrapper} />
			</div>
		);
	};

	return (
		<Surface>
			<Section withGap withPadding>
				{renderServiceMetric()}
				{renderLineChart()}
			</Section>
		</Surface>
	);
};
