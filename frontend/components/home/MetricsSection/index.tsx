/* * */

import MetricsSectionDemand from '@/components/home/MetricsSectionDemand';
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
		<Section heading={t('heading')} withChildrenPadding>
			<div className={styles.innerWrapper}>
				<MetricsSectionDemand />
			</div>
		</Section>
	);

	//
}
