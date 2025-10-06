'use client';

/* * */

import type { DemandMetricsByLine } from '@carrismetropolitana/api-types/metrics';

import { MetricsSectionDemandSkeleton } from '@/components/home/MetricsSectionDemandSkeleton';
import { LineBadge } from '@/components/lines/LineBadge';
import { useLinesContext } from '@/contexts/Lines.context';
import { LineChart } from '@mantine/charts';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	data?: DemandMetricsByLine[]
	main_description?: string
	main_label?: string
}

/* * */

export function MetricsCardByLine({ data, main_description, main_label }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsCardByLine');
	const linesContext = useLinesContext();
	const [selectedLineId, setSelectedLineId] = useState<string | undefined>();

	//
	// C. Transform data

	const formattedData = useMemo(() => {
		return data?.map((item) => {
			const lineData = linesContext.actions.getLineDataById(item.line_id);
			const chartData = item.by_day.map(dayGroup => ({
				day_group: dayGroup.day,
				qty: dayGroup.qty,
			}));
			return {
				...item,
				chart_data: chartData,
				line_data: lineData,
			};
		});
	}, [data]);

	const selectedData = useMemo(() => {
		if (!formattedData) return;
		return formattedData.find(item => item.line_id === selectedLineId);
	}, [formattedData, selectedLineId]);

	const maxValue = useMemo(() => {
		if (!selectedData) return 0;
		const foundMaxValue = selectedData.chart_data.reduce((acc, item) => Math.max(acc, item.qty), 0);
		// Round the number to the nearest multiple of 500
		return Math.ceil(foundMaxValue / 500) * 500;
	}, [formattedData, selectedLineId]);

	useEffect(() => {
		if (!formattedData) return;
		if (selectedLineId) return;
		setSelectedLineId(formattedData[0].line_id);
	}, [formattedData]);

	//
	// D. Render components

	if (!formattedData) {
		return <MetricsSectionDemandSkeleton />;
	}

	return (
		<div className={styles.container}>

			<div className={styles.metricsWrapper}>
				<div className={`${styles.rowWrapper} ${styles.primary}`}>
					<div className={styles.realtimeValueWrapper}>
						{formattedData?.map(item => (
							<div
								key={item.line_id}
								className={`${styles.realtimeValueWrapperItem} ${item.line_id === selectedLineId && styles.selected}`}
								onClick={() => setSelectedLineId(item.line_id)}
							>
								<LineBadge key={item.line_id} lineData={item.line_data} size="lg" />
							</div>
						))}
					</div>
					{main_label && <p className={styles.label}>{main_label}</p>}
					{main_description && <p className={styles.description}>{main_description}</p>}
				</div>
			</div>

			<div className={styles.graphWrapper}>
				<LineChart
					color={selectedData?.line_data?.color || '#ff00ff'}
					curveType="monotone"
					data={selectedData?.chart_data || []}
					dataKey="day_group"
					gridAxis="none"
					h={120}
					strokeWidth={5}
					withDots={false}
					withLegend={false}
					withXAxis={false}
					withYAxis={false}
					yAxisProps={{ domain: [0, maxValue] }}
					referenceLines={[
						{ color: 'var(--color-system-text-400)', label: t('reference_value', { value: maxValue }), labelPosition: 'insideBottomRight', strokeDasharray: '5 10', y: maxValue },
						{ color: 'var(--color-system-text-400)', label: t('reference_value', { value: 0 }), labelPosition: 'insideBottomRight', strokeDasharray: '5 10', y: 0 },
					]}
					series={[
						{
							color: selectedData?.line_data?.color || '#ff00ff',
							label: 'Nº de validações',
							name: 'qty',
						},
					]}
				/>
			</div>

			<div className={styles.summaryWrapper} style={{ backgroundColor: selectedData?.line_data?.color, color: selectedData?.line_data?.text_color }}>
				<p className={styles.summaryValue}>{t('summary_value', { value: selectedData?.qty || -1 })}</p>
				<p className={styles.summaryDescription}>{t('summary_description')}</p>
			</div>

		</div>
	);

	//
}
