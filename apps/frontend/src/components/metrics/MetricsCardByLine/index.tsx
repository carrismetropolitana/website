'use client';

/* * */

import { MetricsSectionDemandSkeleton } from '@/components/home/MetricsSectionDemandSkeleton';
import { LineBadge } from '@/components/lines/LineBadge';
import { useLinesContext } from '@/contexts/Lines.context';
import { useMetricsContext } from '@/contexts/Metrics.context';
import { LineChart } from '@mantine/charts';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function MetricsCardByLine({ agencyId }: { agencyId: string }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsCardByLine');

	const linesContext = useLinesContext();
	const metricsContext = useMetricsContext();

	const [selectedLineId, setSelectedLineId] = useState<string | undefined>();

	//
	// B. Transform data

	const data = metricsContext.data.linesByDay.topLinesByAgency[agencyId];
	const formattedData = data?.lines ?? [];

	const selectedData = useMemo(() => {
		if (!formattedData.length) return undefined;
		return (
			formattedData.find(item => item.line.properties.line_id === selectedLineId)
			|| formattedData[0]
		);
	}, [formattedData, selectedLineId]);

	const lineData = useMemo(() => {
		if (!selectedData) return undefined;
		return linesContext.actions.getLineDataById(selectedData.line.properties.line_id);
	}, [selectedData, linesContext.actions]);

	const maxValue = useMemo(() => {
		if (!selectedData?.chart?.length) return 0;
		const foundMaxValue = selectedData.chart.reduce(
			(acc, item) => Math.max(acc, item.qty),
			0,
		);
		return Math.ceil(foundMaxValue / 500) * 500;
	}, [selectedData]);

	//
	// C. Handlers

	useEffect(() => {
		if (!formattedData?.length || selectedLineId) return;
		setSelectedLineId(formattedData[0].line.properties.line_id);
	}, [formattedData, selectedLineId]);

	//
	// D. Render components

	if (!formattedData?.length) return <MetricsSectionDemandSkeleton />;

	return (
		<div className={styles.container}>
			{/* Line selector */}
			<div className={styles.metricsWrapper}>
				<div className={`${styles.rowWrapper} ${styles.primary}`}>
					<div className={styles.realtimeValueWrapper}>
						{formattedData.map((item) => {
							const lineInfo = linesContext.actions.getLineDataById(
								item.line.properties.line_id,
							);
							return (
								<div
									key={item.line.properties.line_id}
									className={`${styles.realtimeValueWrapperItem} ${
										item.line.properties.line_id === selectedLineId
											? styles.selected
											: ''
									}`}
									onClick={() =>
										setSelectedLineId(item.line.properties.line_id)}
								>
									<LineBadge lineData={lineInfo} size="lg" />
								</div>
							);
						})}
					</div>
					<p className={styles.label}>{t(`agencies.${agencyId}.main_label`)}</p>
					<p className={styles.description}>{t(`agencies.${agencyId}.main_description`)}</p>
				</div>
			</div>

			{/* Chart */}
			<div className={styles.graphWrapper}>
				<LineChart
					color={lineData?.color || '#ff00ff'}
					curveType="monotone"
					data={selectedData?.chart || []}
					dataKey="formatted_day"
					gridAxis="none"
					h={120}
					strokeWidth={5}
					withDots={false}
					withLegend={false}
					withXAxis={false}
					withYAxis={false}
					yAxisProps={{ domain: [0, maxValue] }}
					referenceLines={[
						{
							color: 'var(--color-system-text-400)',
							label: t('reference_value', { value: maxValue }),
							labelPosition: 'insideBottomRight',
							strokeDasharray: '5 10',
							y: maxValue,
						},
						{
							color: 'var(--color-system-text-400)',
							label: t('reference_value', { value: 0 }),
							labelPosition: 'insideBottomRight',
							strokeDasharray: '5 10',
							y: 0,
						},
					]}
					series={[
						{
							color: lineData?.color || '#ff00ff',
							label: 'Nº de validações',
							name: 'qty',
						},
					]}
				/>
			</div>

			{/* Summary */}
			<div
				className={styles.summaryWrapper}
				style={{
					backgroundColor: lineData?.color,
					color: lineData?.text_color,
				}}
			>
				<p className={styles.summaryValue}>
					{t('summary_value', { value: selectedData?.sum || 0 })}
				</p>
				<p className={styles.summaryDescription}>
					{t('summary_description')}
				</p>
			</div>
		</div>
	);
}
