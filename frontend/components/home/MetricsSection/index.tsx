'use client';

/* * */

import MetricsSectionDemand from '@/components/home/MetricsSectionDemand';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
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
		<Surface variant="standout">
			<Section heading={t('heading')} withPadding>
				<Grid columns="ab" withGap>
					<MetricsSectionDemand />
					<Link className={styles.goToMetrics} href="/metrics">
						Abrir métricas completas ›
					</Link>
				</Grid>
			</Section>
		</Surface>
	);

	//
}
