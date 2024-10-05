'use client';

/* * */

import MetricsSectionDemand from '@/components/home/MetricsSectionDemand';
import { Section } from '@/components/layout/Section';
import { Link } from '@/i18n/routing';
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
				<Link className={styles.goToMetrics} href="/metrics">
					Abrir métricas completas ›
				</Link>
			</div>
		</Section>
	);

	//
}
