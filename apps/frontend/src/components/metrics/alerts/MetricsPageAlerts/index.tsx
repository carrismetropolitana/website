'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { AlertsCauseEffectChart } from '@/components/metrics/alerts/AlertsCauseEffectChart';
import { AlertsEvolutionChart } from '@/components/metrics/alerts/AlertsEvolutionChart';
import { AlertsByMunicipality as AlertsByMunicipalityComponent } from '@/components/metrics/alerts/AlertsMunicipalitiesChart';
import { AlertsSummary as AlertsSummaryComponent } from '@/components/metrics/alerts/AlertsSummary';
import { CachedResource } from '@carrismetropolitana/api-types/common';
import { AlertsByMunicipality, AlertsCauseEffect, AlertsEvolution, type AlertsSummary } from '@carrismetropolitana/api-types/metrics';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function MetricsPageAlerts() {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageAlerts');

	//
	// B. Fetch Data

	const { data: alertsSummaryData } = useSWR<CachedResource<AlertsSummary>, Error>(`${getPublicVariable('api_url')}/metrics/alerts/summary`);
	const { data: causeEffectData } = useSWR<CachedResource<AlertsCauseEffect[]>, Error>(`${getPublicVariable('api_url')}/metrics/alerts/cause-effect`);
	const { data: alertsEvolutionData } = useSWR<CachedResource<AlertsEvolution[]>, Error>(`${getPublicVariable('api_url')}/metrics/alerts/evolution`);
	const { data: municipalityCauseData } = useSWR<CachedResource<AlertsByMunicipality[]>, Error>(`${getPublicVariable('api_url')}/metrics/alerts/by-municipality`);

	//
	// C. Transform data

	// Maybe used in the future with live alerts data

	// const tripsNotMadePercentage = +(alertsSummaryData.trips_not_made.total / alertsSummaryData.total_trips * 100).toFixed(2);
	// const tripsNotMadeDueToExternalCausesPercentage = +(
	// 	alertsSummaryData.trips_not_made.by_cause
	// 		.filter(cause =>
	// 			![AlertCause.MAINTENANCE, AlertCause.STRIKE, AlertCause.TECHNICAL_PROBLEM].includes(cause.cause as AlertCause))
	// 		.reduce((acc, cause) => acc + cause.count, 0) / alertsSummaryData.trips_not_made.total * 100
	// ).toFixed(2);

	//
	// D. Render components

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withGap withPadding>

				<div className={styles.summaryContainer}>
					<AlertsSummaryComponent data={alertsSummaryData?.data} />
					<p className={styles.description}>* {t('info.description')}</p>
				</div>

				{/* {!tripsNotMadePercentage || !tripsNotMadeDueToExternalCausesPercentage ? <></>
					: (
						<>
							<div className={styles.infoWrapper}>
								<div className={styles.bigNumberWrapper}>
									<h1 className={styles.bigNumber} style={{ color: 'var(--color-brand)' }}>{tripsNotMadePercentage}%</h1>
									<LiveIcon className={styles.liveIcon} color="var(--color-brand)" />
								</div>
								<h3 className={styles.title}>{t('info.subheading_1')}, {tripsNotMadeDueToExternalCausesPercentage}% {t('info.subheading_2')}</h3>
								<p className={styles.description}>{t('info.description')}</p>
							</div>

							<Space h="sm" />
						</>
					)} */}

				<div className={styles.chartContainer}>
					<h3 className={styles.chartTitle}>{t('causeEffectChart.heading')}</h3>
					<AlertsCauseEffectChart data={causeEffectData?.data} />
				</div>

				<div className={styles.chartContainer}>
					<h3 className={styles.chartTitle}>{t('alertsEvolutionChart.heading')}</h3>
					<AlertsEvolutionChart data={alertsEvolutionData?.data} />
				</div>

				<div className={styles.chartContainer}>
					<h3 className={styles.chartTitle}>{t('byMunicipalityChart.heading')}</h3>
					<AlertsByMunicipalityComponent data={municipalityCauseData?.data} />
				</div>

			</Section>

		</Surface>
	);

	//
}
