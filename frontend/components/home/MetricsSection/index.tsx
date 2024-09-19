'use client';

/* * */

import MetricsSectionDemand from '@/components/home/MetricsSectionDemand';
import MetricsSectionDemandByLine from '@/components/home/MetricsSectionDemandByLine';
import MetricsSectionDemandByMonth from '@/components/home/MetricsSectionDemandByMonth';
import MetricsSectionDemandByOperator from '@/components/home/MetricsSectionDemandByOperator';
import Section from '@/components/layout/Section';
import { OperatorMetrics } from '@/types/metrics.types';
import getOperationalDay from '@/utils/operation';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export default function Component() {
//

	//
	// A. Setup variables

	const t = useTranslations('HomeMetricsSection');

	//
	// B. Fetch Data
	const { data, isLoading } = useSWR<OperatorMetrics[]>(`https://api.carrismetropolitana.pt/v2/metrics/demand/operator/cm/${getOperationalDay()}`, { refreshInterval: 5 * 60 * 1000 }); // 5 minutes

	//
	// C. Render components

	return (
		<Section heading={t('heading')} withGap={false} withChildrenPadding>
			<div className={styles.innerWrapper}>
				<MetricsSectionDemand />
				<MetricsSectionDemandByLine />
				<MetricsSectionDemandByMonth />
				<div className={styles.areaWrapper}>
					<MetricsSectionDemandByOperator loading={isLoading} metrics={data && data[0]} />
					<MetricsSectionDemandByOperator loading={isLoading} metrics={data && data[1]} />
					<MetricsSectionDemandByOperator loading={isLoading} metrics={data && data[2]} />
					<MetricsSectionDemandByOperator loading={isLoading} metrics={data && data[3]} />
				</div>
			</div>
		</Section>
	);

	//
}
