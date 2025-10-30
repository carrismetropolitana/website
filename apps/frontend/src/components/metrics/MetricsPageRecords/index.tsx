'use client';

/* * */

import { MetricsSectionDemandSkeleton } from '@/components/home/MetricsSectionDemandSkeleton';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LastUpdatedAt } from '@/components/metrics/LastUpdatedAt';
import { useMetricsContext } from '@/contexts/Metrics.context';
import { Image } from '@mantine/core';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function MetricsPageRecords() {
	//

	//
	// A. Define variables

	const t = useTranslations('metrics.MetricsPageRecords');
	const { data } = useMetricsContext();

	const topDay = data.demandRecords.topDay;
	const topMonth = data.demandRecords.topMonth;

	//
	// B. Render components

	return (
		<Surface>
			<div id="passengerRecords">
				<Section heading={t('heading')} withGap withPadding>
					<p className={styles.text}>{t('text_1')}</p>
					<LastUpdatedAt lastUpdated={data.demandRecords.lastUpdated} />
				</Section>

				<Section withPadding>
					<Grid columns="ab" withGap>

						{topDay
							? (
								<div className={styles.cardWrapper}>
									<Image className={styles.cardBackground} src="/assets/metrics/record-day.svg" />
									<div className={styles.cardContent}>
										<h1 className={styles.cardTitle}>{Intl.NumberFormat('pt-PT').format(topDay.qty)}</h1>
										<p className={styles.cardDescription}>{t('day_record.passengers')}</p>
										<p className={styles.cardDate}>{t('day_record.date', { value: DateTime.fromISO(topDay.date).toJSDate() })}</p>
									</div>
								</div>
							)
							: <MetricsSectionDemandSkeleton />}

						{topMonth
							? (
								<div className={styles.cardWrapper}>
									<Image className={styles.cardBackground} src="/assets/metrics/record-month.svg" />
									<div className={styles.cardContent}>
										<h1 className={styles.cardTitle}>{Intl.NumberFormat('pt-PT').format(topMonth.qty)}</h1>
										<p className={styles.cardDescription}>{t('month_record.passengers')}</p>
										<p className={styles.cardDate}>{t('month_record.date', { value: DateTime.fromISO(topMonth.date).toJSDate() })}</p>
									</div>
								</div>
							)
							: <MetricsSectionDemandSkeleton />}
					</Grid>
				</Section>
			</div>
		</Surface>
	);

	//
}
