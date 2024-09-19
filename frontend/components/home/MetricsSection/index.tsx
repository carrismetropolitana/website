/* * */

import MetricsSectionDemand from '@/components/home/MetricsSectionDemand';
import MetricsSectionDemandByLine from '@/components/home/MetricsSectionDemandByLine';
import MetricsSectionDemandByMonth from '@/components/home/MetricsSectionDemandByMonth';
import Section from '@/components/layout/Section';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export default function Component() {
//

	//
	// A. Setup variables

	const t = useTranslations('HomeMetricsSection');

	//
	// B. Render components

	return (
		<Section heading={t('heading')} withGap={false} withChildrenPadding>
			<div className={styles.innerWrapper}>
				<MetricsSectionDemand />
				<MetricsSectionDemandByLine />
				<MetricsSectionDemandByMonth />
				{/* <MetricsSectionDemandByStop /> */}
			</div>
		</Section>
	);

	//
}
