'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { MetricsDemandChart } from '@/components/metrics/MetricsDemandChart';
import { type DemandMetricsByAgency, type DemandMetricsByAgencyDay } from '@carrismetropolitana/api-types/metrics';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function MetricsSection() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.MetricsSection');

	//
	// B. Fetch Data

	const { data: metricsByAgencyDayData } = useSWR<DemandMetricsByAgency[]>(`${getPublicVariable('api_url')}/metrics/demand/by_agency/day`, { refreshInterval: 60000 });

	//
	// C. Transform data

	const allAgenciesSum = useMemo(() => {
		if (!metricsByAgencyDayData) return;
		return metricsByAgencyDayData.reduce((acc, agencyBlock) => acc + agencyBlock.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0), 0);
	}, [metricsByAgencyDayData]);

	const allAgenciesChart = useMemo(() => {
		if (!metricsByAgencyDayData) return;
		// Reduce the data to a single array of objects with the structure { x: string, y: number }
		const result = metricsByAgencyDayData.reduce((acc, agencyBlock) => {
			agencyBlock.data.forEach((dateBlock) => {
				const formattedDateBlock = DateTime.fromISO(dateBlock.hour_group).toFormat('yyyy-LL-dd HH:mm');
				const existingData = acc.find(item => item.hour_group === formattedDateBlock);
				if (existingData) {
					existingData.qty += dateBlock.qty;
				}
				else {
					acc.push({ hour_group: formattedDateBlock, qty: dateBlock.qty });
				}
			});
			return acc;
		}, [] as DemandMetricsByAgencyDay[]);
		const sortedResult = result.sort((a, b) => a.hour_group.localeCompare(b.hour_group));
		return sortedResult;
	}, [metricsByAgencyDayData]);

	//
	// B. Render components

	return (
		<Surface variant="standout">
			<Section heading={t('heading')} withPadding>
				<Grid columns="ab" withGap>
					<MetricsDemandChart
						data={allAgenciesChart}
						data_key="hour_group"
						main_label={t('demand.label')}
						main_value={t('demand.value', { value: allAgenciesSum || -1 })}
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
