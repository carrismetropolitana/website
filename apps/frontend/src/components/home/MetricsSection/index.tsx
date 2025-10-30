'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { MetricsDemandChart } from '@/components/metrics/MetricsDemandChart';
import { useMetricsContext } from '@/contexts/Metrics.context';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

export function MetricsSection() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.MetricsSection');
	const { data } = useMetricsContext();

	//
	// B. Render components

	return (
		<Surface variant="standout">
			<Section heading={t('heading')} withPadding>
				<Grid columns="ab" withGap>
					<MetricsDemandChart
						data={data.agenciesByDay.all.chart}
						data_key="formatted_day"
						main_label={t('demand.label')}
						main_value={t('demand.value', { value: data.agenciesByDay.all.sum || -1 })}
						data_series={[
							{
								color: 'var(--color-brand)',
								label: 'Nº de validações',
								name: 'qty',
							},
						]}
					/>
					<Link className={styles.link} href="/metrics">{t('link_label')}</Link>
				</Grid>
			</Section>
		</Surface>
	);

	//
}
