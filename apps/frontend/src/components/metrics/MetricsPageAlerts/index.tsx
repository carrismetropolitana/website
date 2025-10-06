'use client';

/* * */

import { LiveIcon } from '@/components/common/LiveIcon';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { AlertCause } from '@/types/alerts.types';
import { Space } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

import { AlertsCauseEffectChart } from './MetricsPageAlertsSectios/AlertsCauseEffectChart';
import { AlertsEvolutionChart } from './MetricsPageAlertsSectios/AlertsEvolutionChart';
import { AlertsByMunicipality } from './MetricsPageAlertsSectios/AlertsMunicipalitiesChart';
import { AlertsSummary } from './MetricsPageAlertsSectios/AlertsSummary';

/* * */

export function MetricsPageAlerts() {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageAlerts');

	//
	// B. Fetch Data

	// const { data } = useSWR<AlertsMetrics>(`${getPublicVariable('api_url')}/metrics/alerts`);
	// const alertsData = data?.data;

	const effectsCauseRawData = [
		{ cause: 'ACCIDENT', effects: [
			{ type: 'SIGNIFICANT_DELAYS', value: 300 },
			{ type: 'DETOUR', value: 1200 },
			{ type: 'NO_SERVICE', value: 50 },
		], total: 1550 },
		{ cause: 'CONSTRUCTION', effects: [
			{ type: 'SIGNIFICANT_DELAYS', value: 100 },
			{ type: 'DETOUR', value: 50 },
			{ type: 'STOP_MOVED', value: 2100 },
		], total: 2250 },
		{ cause: 'DEMONSTRATION', effects: [
			{ type: 'NO_EFFECT', value: 80 },
			{ type: 'OTHER_EFFECT', value: 300 },
		], total: 380 },
		{ cause: 'HOLIDAY', effects: [
			{ type: 'NO_SERVICE', value: 2100 },
		], total: 2100 },
		{ cause: 'MAINTENANCE', effects: [
			{ type: 'SIGNIFICANT_DELAYS', value: 150 },
			{ type: 'NO_SERVICE', value: 500 },
			{ type: 'ACCESSIBILITY_ISSUE', value: 5 },
		], total: 650 },
		{ cause: 'MEDICAL_EMERGENCY', effects: [
			{ type: 'SIGNIFICANT_DELAYS', value: 40 },
			{ type: 'NO_SERVICE', value: 20 },
		], total: 60 },
		{ cause: 'POLICE_ACTIVITY', effects: [
			{ type: 'DETOUR', value: 100 },
			{ type: 'SIGNIFICANT_DELAYS', value: 60 },
		], total: 160 },
		{ cause: 'STRIKE', effects: [
			{ type: 'MODIFIED_SERVICE', value: 1800 },
			{ type: 'REDUCED_SERVICE', value: 200 },
		], total: 2000 },
		{ cause: 'TECHNICAL_PROBLEM', effects: [
			{ type: 'SIGNIFICANT_DELAYS', value: 500 },
			{ type: 'UNKNOWN_EFFECT', value: 300 },
		], total: 800 },
		{ cause: 'WEATHER', effects: [
			{ type: 'SIGNIFICANT_DELAYS', value: 250 },
			{ type: 'DETOUR', value: 400 },
			{ type: 'ADDITIONAL_SERVICE', value: 100 },
		], total: 750 },
	];

	const alertsImpactData = useMemo(
		() =>
			Array.from({ length: 15 }).map((_, i) => {
				const day = new Date();
				day.setDate(day.getDate() - (14 - i)); // oldest to newest
				return {
					day_group: day.toISOString().slice(0, 10), // YYYY-MM-DD
					lines_affected: Math.floor(Math.random() * 200) + 20,
					people_affected: Math.floor(Math.random() * 500) + 50,
				};
			}),
		[],
	);

	const municipalityCauseData = [
		{
			causes: [
				{ type: AlertCause.ACCIDENT, value: 1200 },
				{ type: AlertCause.CONSTRUCTION, value: 800 },
				{ type: AlertCause.WEATHER, value: 400 },
			],
			municipality_id: '1106',
		},
		{
			causes: [
				{ type: AlertCause.ACCIDENT, value: 600 },
				{ type: AlertCause.CONSTRUCTION, value: 300 },
				{ type: AlertCause.WEATHER, value: 700 },
			],
			municipality_id: '1312',
		},
		{
			causes: [
				{ type: AlertCause.ACCIDENT, value: 200 },
				{ type: AlertCause.CONSTRUCTION, value: 400 },
				{ type: AlertCause.WEATHER, value: 100 },
			],
			municipality_id: '0603',
		},
		{
			causes: [
				{ type: AlertCause.ACCIDENT, value: 50 },
				{ type: AlertCause.CONSTRUCTION, value: 100 },
				{ type: AlertCause.WEATHER, value: 20 },
			],
			municipality_id: '3103',
		},
	];

	//
	// C. Transform data

	const affectedPassengers = 52000;
	const externalCausesPercentage = 83;
	const totalDisruptions = 1340;

	const tripsNotMadePercentage = 2.21;
	const tripsNotMadeDueToExternalCausesPercentage = 90;

	//
	// E. Render components

	// if (!alertsData) {
	// 	return <Loader />;
	// }

	return (
		<Surface>
			<Section heading={t('heading')} subheading={t('subheading')} withGap withPadding>

				<AlertsSummary affectedPassengers={affectedPassengers} externalCausesPercentage={externalCausesPercentage} totalDisruptions={totalDisruptions} />

				<Space h="sm" />

				<div className={styles.infoWrapper}>
					<div className={styles.bigNumberWrapper}>
						<h1 className={styles.bigNumber} style={{ color: 'var(--color-brand)' }}>{tripsNotMadePercentage}%</h1>
						<LiveIcon className={styles.liveIcon} color="var(--color-brand)" />
					</div>
					<h3 className={styles.title}>das viagens não realizadas, {tripsNotMadeDueToExternalCausesPercentage}% deveram-se a causas externas.</h3>
					<p className={styles.description}>Consideramos causas externas todos os eventos fora do controlo direto do nosso serviço, como condições meteorológicas adversas, acidentes de viação, obras ou intervenções de terceiros. Por outro lado, causas internas referem-se a falhas ou limitações operacionais da nossa própria operação, como problemas técnicos nos veículos ou falta de pessoal.</p>
				</div>

				<Space h="sm" />

				<div className={styles.chartContainer}>
					<h3 className={styles.chartTitle}>Consequências das disrupções nos serviços</h3>
					{/* @ts-expect-error - Temp until data from the api */}
					<AlertsCauseEffectChart data={effectsCauseRawData} />
				</div>

				<div className={styles.chartContainer}>
					<h3 className={styles.chartTitle}>Impacto das perturbações no serviço</h3>
					<AlertsEvolutionChart data={alertsImpactData} />
				</div>

				<div className={styles.chartContainer}>
					<h3 className={styles.chartTitle}>Disrupções por município</h3>
					<AlertsByMunicipality data={municipalityCauseData} />
				</div>

			</Section>

		</Surface>
	);

	//
}
