'use client';

/* * */

import MetricsSectionDemandByLine from '@/components/home/MetricsSectionDemandByLine';
import MetricsSectionDemandByMonth from '@/components/home/MetricsSectionDemandByMonth';
import MetricsSectionDemandByOperator from '@/components/home/MetricsSectionDemandByOperator';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { OperatorMetrics } from '@/types/metrics.types';
import getOperationalDay from '@/utils/operation';
import { Routes } from '@/utils/routes';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Fetch Data

	const { data, isLoading } = useSWR<OperatorMetrics[]>(`${Routes.API}/metrics/demand/operator/cm/${getOperationalDay()}`, { refreshInterval: 5 * 60 * 1000 }); // 5 minutes

	//
	// B. Render components

	return (
		<Surface>
			<Section withGap withPadding>
				<MetricsSectionDemandByLine />
				<MetricsSectionDemandByMonth />
				<div className={styles.areaWrapper}>
					<MetricsSectionDemandByOperator loading={isLoading} metrics={data && data[0]} />
					<MetricsSectionDemandByOperator loading={isLoading} metrics={data && data[1]} />
					<MetricsSectionDemandByOperator loading={isLoading} metrics={data && data[2]} />
					<MetricsSectionDemandByOperator loading={isLoading} metrics={data && data[3]} />
				</div>
			</Section>
		</Surface>
	);

	//
}
