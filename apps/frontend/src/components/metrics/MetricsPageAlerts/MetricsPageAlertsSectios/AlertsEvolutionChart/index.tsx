import { LineChart } from '@mantine/charts';
import { Badge } from '@mantine/core';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface AlertsEvolutionChartData {
	day_group: string
	lines_affected: number
	people_affected: number
}

/* * */

const cx = classNames.bind(styles);

export function AlertsEvolutionChart({ data }: { data?: AlertsEvolutionChartData[] }) {
	//
	// A. Setup variables
	const [metric, setMetric] = useState<'lines_affected' | 'people_affected'>('lines_affected');
	const maxValue = Math.max(...data.map(d => d[metric]));

	const metricLabels: Record<typeof metric, string> = {
		lines_affected: 'Linhas afetadas',
		people_affected: 'Pessoas afetadas',
	};

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.badgesContainer}>
				<Badge className={cx({ active: metric === 'lines_affected', badge: true })} onClick={() => setMetric('lines_affected')}>Linhas</Badge>
				<Badge className={cx({ active: metric === 'people_affected', badge: true })} onClick={() => setMetric('people_affected')}>Pessoas</Badge>
			</div>

			<LineChart
				color="var(--color-brand)"
				curveType="monotone"
				data={data || []}
				dataKey="day_group"
				gridAxis="none"
				h={200}
				strokeWidth={5}
				withDots={false}
				withLegend={false}
				withXAxis={false}
				withYAxis={false}
				yAxisProps={{ domain: [0, maxValue] }}
				referenceLines={[
					{
						color: 'var(--color-system-text-400)',
						label: `Máx: ${maxValue}`,
						labelPosition: 'insideBottomRight',
						strokeDasharray: '5 10',
						y: maxValue,
					},
					{
						color: 'var(--color-system-text-400)',
						label: 'Min: 0',
						labelPosition: 'insideBottomRight',
						strokeDasharray: '5 10',
						y: 0,
					},
				]}
				series={[
					{
						color: 'var(--color-brand)',
						label: metricLabels[metric],
						name: metric,
					},
				]}
			/>

			<div className={styles.summaryWrapper}>
				<p className={styles.summaryValue}>{metric === 'lines_affected' ? 200 : 52000}</p>
				<p className={styles.summaryDescription}>{metric === 'lines_affected' ? 'linhas afetadas' : 'pessoas afetadas'} nos últimos 15 dias</p>
			</div>
		</div>
	);
}
