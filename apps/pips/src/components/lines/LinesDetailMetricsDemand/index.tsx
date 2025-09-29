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

export function LinesDetailMetricsDemand() {
	//

	//
	// A. Setup variables

	const t = useTranslations('lines.LinesDetailMetricsDemand');
	const linesDetailContext = useLinesDetailContext();

	//
	// B. Transform data

	const selectedDistribution = useMemo(() => {
		if (!linesDetailContext.data.demand_metrics) return null;
		return linesDetailContext.data.demand_metrics.by_day
			.sort((a, b) => Number(a.day) - Number(b.day))
			.map(item => ({
				operationalDate: DateTime.fromFormat(item.day.toString(), 'yyyy-MM-dd').toFormat('ccc, dd LLL yyyy', { locale: 'pt-PT' }),
				qty: item.qty,
			}));
	}, [linesDetailContext.data.demand_metrics]);

	const averageDemand = useMemo(() => {
		if (!linesDetailContext.data.demand_metrics) return 0;
		return (linesDetailContext.data.demand_metrics.qty / linesDetailContext.data.demand_metrics.by_day.length).toFixed(0);
	}, [linesDetailContext.data.demand_metrics]);

	//
	// C. Render components

	if (!linesDetailContext.data.line || !selectedDistribution) {
		return null;
	}

	return (
		<Surface fullHeight>
			<Section withGap withPadding>

				<div className={styles.infoWrapper}>
					<div className={styles.bigNumberWrapper}>
						<h1 className={styles.bigNumber} style={{ color: linesDetailContext.data.line?.color }}>
							{t('big_number', { value: linesDetailContext.data.demand_metrics?.qty || -1 })}
						</h1>
						<LiveIcon className={styles.liveIcon} color={linesDetailContext.data.line?.color} />
					</div>
					<h3 className={styles.title}>{t('title')}</h3>
					<p className={styles.description}>{t('description')}</p>
				</div>

				<div className={styles.chartWrapper}>
					<LineChart
						color={linesDetailContext.data.line?.color}
						connectNulls={false}
						curveType="monotone"
						data={selectedDistribution}
						dataKey="operationalDate"
						gridAxis="none"
						h={150}
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
								label: t('chart.series.average.label', { value: averageDemand }),
								labelPosition: 'insideBottomRight',
								y: averageDemand,
							},
							{
								color: 'var(--color-system-text-300)',
								label: '0',
								labelPosition: 'insideBottomRight',
								y: 0,
							},
						]}
						series={[
							{
								color: linesDetailContext.data.line?.color,
								label: t('chart.series.qty.label'),
								name: 'qty',
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
