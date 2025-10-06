'use client';

/* * */

import { MetricsSectionDemandSkeleton } from '@/components/home/MetricsSectionDemandSkeleton';
import { BarChart, LineChart, LineChartProps } from '@mantine/charts';

import styles from './styles.module.css';

/* * */

interface Props {
	data?: LineChartProps['data']
	data_key: string
	data_series: { color: string, label: string, name: string }[]
	display_type?: 'bars' | 'lines'
	main_description?: string
	main_label: string
	main_value: string
}

/* * */

export function MetricsDemandChart({ data, data_key, data_series, display_type = 'lines', main_description, main_label, main_value }: Props) {
	//

	//
	// A. Setup variables

	//
	// D. Render components

	if (!data) {
		return <MetricsSectionDemandSkeleton />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.metricsWrapper}>
				<div className={`${styles.rowWrapper} ${styles.primary}`}>
					<div className={styles.realtimeValueWrapper}>
						<p className={styles.value}>{main_value}</p>
					</div>
					<p className={styles.label}>{main_label}</p>
					{main_description && <p className={styles.description}>{main_description}</p>}
				</div>
			</div>
			<div className={styles.graphWrapper}>
				{display_type === 'lines' && (
					<LineChart
						color="var(--color-brand)"
						curveType="monotone"
						data={data}
						dataKey={data_key}
						gridAxis="none"
						h={120}
						series={data_series}
						strokeWidth={5}
						withDots={false}
						withLegend={false}
						withXAxis={false}
						withYAxis={false}
					/>
				)}
				{display_type === 'bars' && (
					<BarChart
						color="var(--color-brand)"
						data={data}
						dataKey={data_key}
						gridAxis="none"
						h={180}
						series={data_series}
						withLegend={false}
						withXAxis={false}
						withYAxis={false}
					/>
				)}
			</div>
		</div>
	);

	//
}
