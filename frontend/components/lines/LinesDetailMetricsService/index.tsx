'use client';

/* * */

import { LiveIcon } from '@/components/common/LiveIcon';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { LineChart } from '@mantine/charts';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export function LinesDetailMetricsService() {
	//

	//
	// A. Define Variables

	const t = useTranslations('lines.LinesDetailMetricsService');
	const linesDetailContext = useLinesDetailContext();

	//
	// B. Transform data

	const totalTripCount = useMemo(() => {
		if (!linesDetailContext.data.service_metrics) return null;
		return linesDetailContext.data.service_metrics.reduce((acc, curr) => acc + Number(curr.total_trip_count), 0);
	}, [linesDetailContext.data.service_metrics]);

	const passTripCount = useMemo(() => {
		if (!linesDetailContext.data.service_metrics) return null;
		return linesDetailContext.data.service_metrics.reduce((acc, curr) => acc + Number(curr.pass_trip_count), 0);
	}, [linesDetailContext.data.service_metrics]);

	const last15DaysService = useMemo(() => {
		if (!linesDetailContext.data.service_metrics) return [];
		linesDetailContext.data.service_metrics.sort((a, b) => Number(b.operational_date) - Number(a.operational_date));
		return linesDetailContext.data.service_metrics.slice(0, 15);
	}, [linesDetailContext.data.service_metrics]);

	const service15dayAverage = useMemo(() => {
		if (!last15DaysService) return 0;
		const { passTripCount, totalTripCount } = last15DaysService.reduce((acc, curr) => ({
			passTripCount: acc.passTripCount + Number(curr.pass_trip_count),
			totalTripCount: acc.totalTripCount + Number(curr.total_trip_count),
		}), { passTripCount: 0, totalTripCount: 0 });
		return ((passTripCount / totalTripCount) * 100).toFixed(2);
	}, [last15DaysService]);

	const service15DayDistribution = useMemo(() => {
		if (!last15DaysService) return null;
		return last15DaysService
			.sort((a, b) => {
				return a.operational_date?.localeCompare(b.operational_date);
			})
			.map(service => ({
				...service,
				fail_trip_count: service.total_trip_count - service.pass_trip_count,
				operational_date: DateTime.fromFormat(service.operational_date, 'yyyyMMdd').toFormat('ccc, dd LLL yyyy', { locale: 'pt-PT' }),
				pass_trip_percentage: Math.round(((service.pass_trip_percentage * 100) + Number.EPSILON) * 100) / 100,
			}));
	}, [last15DaysService]);

	//
	// C. Render components

	if (!linesDetailContext.data.line || !totalTripCount || !passTripCount || !service15DayDistribution) {
		return null;
	}

	return (
		<Surface>
			<Section withGap withPadding>

				<div className={styles.infoWrapper}>
					<div className={styles.bigNumberWrapper}>
						<h1 className={styles.bigNumber} style={{ color: linesDetailContext.data.line.color }}>{t('big_number', { value: service15dayAverage })}</h1>
						<LiveIcon className={styles.liveIcon} color={linesDetailContext.data.line.color} />
					</div>
					<h3 className={styles.title}>{t('title', { pass_trip_count: passTripCount, total_trip_count: totalTripCount })}</h3>
					<p className={styles.description}>{t('description')}</p>
				</div>

				<div className={styles.chartWrapper}>
					<LineChart
						color={linesDetailContext.data.line.color}
						connectNulls={false}
						curveType="monotone"
						data={service15DayDistribution}
						dataKey="operational_date"
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
							{ color: 'var(--color-system-text-300)', label: '75%', labelPosition: 'insideBottomRight', y: 75 },
							{ color: 'var(--color-system-text-300)', label: '100%', labelPosition: 'insideBottomRight', y: 100 },
							{ color: 'var(--color-system-text-300)', label: '0%', labelPosition: 'insideBottomRight', y: 0 },
						]}
						series={[
							{
								color: linesDetailContext.data.line.color,
								label: t('chart.series.pass_trip_percentage.label'),
								name: 'pass_trip_percentage',
							},
							{
								color: 'transparent',
								label: t('chart.series.total_trip_count.label'),
								name: 'total_trip_count',
								yAxisId: 'right',
							},
							{
								color: 'transparent',
								label: t('chart.series.pass_trip_count.label'),
								name: 'pass_trip_count',
								yAxisId: 'right',
							},
							{
								color: 'transparent',
								label: t('chart.series.fail_trip_count.label'),
								name: 'fail_trip_count',
								yAxisId: 'right',
							},
						]}
					/>
				</div>

				<div className={styles.infoWrapper}>
					<p className={styles.footnote}>{t('footnote')}</p>
				</div>

			</Section>
		</Surface>
	);

	//
};
