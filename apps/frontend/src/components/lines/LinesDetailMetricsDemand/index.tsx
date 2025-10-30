'use client';

/* * */

import { LiveIcon } from '@/components/common/LiveIcon';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useLinesDetailContext } from '@/contexts/LinesDetail.context';
import { useMetricsContext } from '@/contexts/Metrics.context';
import { LineChart } from '@mantine/charts';
import { Dates } from '@tmlmobilidade/utils';
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
	const metricsContext = useMetricsContext();

	//
	// B. Transform data

	const lineData = useMemo(() => {
		if (!linesDetailContext.data) return null;
		const lineId = linesDetailContext.data.line?.id;
		const endDate = Dates.now('Europe/Lisbon');
		const startDate = Dates.now('Europe/Lisbon').minus({ days: 15 });

		const result = metricsContext.helpers.getLineDataForPeriod(lineId, startDate, endDate);

		return result;
	}, [linesDetailContext.data.line, metricsContext.helpers]);

	const averageDemand = useMemo(() => {
		if (!lineData) return 0;
		return (lineData.sum / lineData.chart.length).toFixed(0);
	}, [lineData]);

	//
	// C. Render components

	if (!lineData) {
		return null;
	}

	return (
		<Surface fullHeight>
			<Section withGap withPadding>

				<div className={styles.infoWrapper}>
					<div className={styles.bigNumberWrapper}>
						<h1 className={styles.bigNumber} style={{ color: linesDetailContext.data.line?.color }}>
							{t('big_number', { value: lineData.sum || -1 })}
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
						data={lineData.chart}
						dataKey="formatted_day"
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
