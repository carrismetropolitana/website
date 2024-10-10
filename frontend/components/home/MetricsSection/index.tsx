'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import MetricsCardByLine from '@/components/metrics/MetricsCardByLine';
import MetricsCardToday from '@/components/metrics/MetricsCardToday';
import MetricsCardYearToDate from '@/components/metrics/MetricsCardYearToDate';
import { FormatSwitch } from '@/components/responsive/FormatSwitch';
import { Link } from '@/i18n/routing';
import { Routes } from '@/utils/routes';
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
				<Grid columns="a" withGap>
					<FormatSwitch
						desktop={(
							<Grid columns="ab" withGap>
								<MetricsCardToday className={styles.today} />
								<MetricsCardYearToDate className={styles.ytd} />
								<MetricsCardByLine className={styles.byLine} showGraph={false} />
								<Link className={styles.goToMetrics} href={Routes.METRICS.route}>
									Abrir métricas completas ›
								</Link>
							</Grid>
						)}
						mobile={(
							<div className={styles.mobileContainer}>
								<div className={styles.cardContainer}>
									<MetricsCardToday className={styles.today} />
									<MetricsCardYearToDate className={styles.ytd} />
									<MetricsCardByLine className={styles.byLine} showGraph={false} />
								</div>
								<Link className={styles.goToMetrics} href={Routes.METRICS.route}>
									Abrir métricas completas ›
								</Link>
							</div>
						)}
					/>
				</Grid>
			</Section>
		</Surface>
	);

	//
}
