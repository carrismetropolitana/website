import { AlertsEvolution as AlertsEvolutionType } from '@carrismetropolitana/api-types/metrics';
import { LineChart, Sparkline } from '@mantine/charts';
import { Badge, Skeleton } from '@mantine/core';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

const cx = classNames.bind(styles);

/* * */

export function AlertsEvolutionChart({ data }: { data?: AlertsEvolutionType[] }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageAlerts.alertsEvolutionChart');

	const [metric, setMetric] = useState<'lines_affected' | 'people_affected'>('lines_affected');

	const metricLabels: Record<typeof metric, string> = {
		lines_affected: t('lines_affected'),
		people_affected: t('passengers_affected'),
	};

	//
	// B. Transform Data

	const safeData = Array.isArray(data) ? data : [];

	const maxValue = safeData.length > 0 ? Math.max(...safeData.map(d => d[metric])) : 0;

	const totalLinesAffected = safeData.reduce((acc, d) => acc + d.lines_affected, 0);
	const totalPeopleAffected = safeData.reduce((acc, d) => acc + d.people_affected, 0);

	//
	// C. Render components

	if (!data) {
		return (
			<div className={styles.container}>
				<div className={styles.badgesContainer}>
					<Skeleton height={32} mb="md" radius="md" width={120} />
				</div>
				<div className={styles.graphWrapper}>
					<Sparkline
						color="gray"
						curveType="natural"
						data={[8, 9, 10, 8, 10, 12]}
						fillOpacity={1}
						h={100}
					/>
				</div>
				<div className={styles.summaryWrapper}>
					<Skeleton height={28} radius="sm" width={80} />
					<Skeleton height={16} mt={4} radius="sm" width={160} />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.badgesContainer}>
				<Badge className={cx({ active: metric === 'lines_affected', badge: true })} onClick={() => setMetric('lines_affected')}>{t('lines')}</Badge>
				<Badge className={cx({ active: metric === 'people_affected', badge: true })} onClick={() => setMetric('people_affected')}>{t('passengers')}</Badge>
			</div>

			<LineChart
				color="var(--color-brand)"
				curveType="monotone"
				data={safeData}
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
				<p className={styles.summaryValue}>{metric === 'lines_affected' ? totalLinesAffected.toLocaleString() : totalPeopleAffected.toLocaleString()}</p>
				<p className={styles.summaryDescription}>{metric === 'lines_affected' ? t('lines_affected').toLocaleLowerCase() : t('passengers_affected').toLocaleLowerCase()} {t('last_15_days')}</p>
			</div>
		</div>
	);
}
