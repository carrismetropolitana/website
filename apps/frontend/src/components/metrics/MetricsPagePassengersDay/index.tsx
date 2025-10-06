'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { MetricsDemandChart } from '@/components/metrics/MetricsDemandChart';
import { type DemandMetricsByAgency, type DemandMetricsByAgencyDay } from '@carrismetropolitana/api-types/metrics';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export function MetricsPagePassengersDay() {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPagePassengersDay');

	//
	// B. Fetch Data

	const { data: metricsByAgencyDayData, isLoading: metricsByAgencyDayLoading } = useSWR<DemandMetricsByAgency[]>(`${getPublicVariable('api_url')}/metrics/demand/by_agency/day`, { refreshInterval: 60000 });

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
		// // The original data only includes data from today at 4:00 until now. We need to add the hours until tomorrow at 4:00
		// // with null values
		// const todayAt4 = DateTime.fromObject({ hour: 4 });
		// const tomorrowAt4 = todayAt4.plus({ days: 1 });
		// const currentHour = DateTime.local();
		// const hoursToAdd = tomorrowAt4.diff(currentHour, 'hours').hours;
		// for (let i = 1; i < hoursToAdd; i++) {
		// 	const hour = todayAt4.plus({ hours: i });
		// 	const formattedHour = hour.toFormat('yyyy-LL-dd HH:mm');
		// 	if (!sortedResult.find(item => item.hour_group === formattedHour)) {
		// 		sortedResult.push({ hour_group: formattedHour, qty: 0 });
		// 	}
		// }
		return sortedResult;
	}, [metricsByAgencyDayData]);

	//

	const agency41Sum = useMemo(() => {
		if (!metricsByAgencyDayData) return;
		const agency41Data = metricsByAgencyDayData.find(agencyBlock => agencyBlock.agency_id === '41');
		return agency41Data?.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0);
	}, [metricsByAgencyDayData]);

	const agency41Chart = useMemo(() => {
		if (!metricsByAgencyDayData) return;
		const foundData = metricsByAgencyDayData.find(agencyBlock => agencyBlock.agency_id === '41');
		return foundData?.data.map(dateBlock => ({ hour_group: DateTime.fromISO(dateBlock.hour_group).toFormat('yyyy-LL-dd HH:mm'), qty: dateBlock.qty }));
	}, [metricsByAgencyDayData]);

	//

	const agency42Sum = useMemo(() => {
		if (!metricsByAgencyDayData) return;
		const agency42Data = metricsByAgencyDayData.find(agencyBlock => agencyBlock.agency_id === '42');
		return agency42Data?.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0);
	}, [metricsByAgencyDayData]);

	const agency42Chart = useMemo(() => {
		if (!metricsByAgencyDayData) return;
		const foundData = metricsByAgencyDayData.find(agencyBlock => agencyBlock.agency_id === '42');
		return foundData?.data.map(dateBlock => ({ hour_group: DateTime.fromISO(dateBlock.hour_group).toFormat('yyyy-LL-dd HH:mm'), qty: dateBlock.qty }));
	}, [metricsByAgencyDayData]);

	//

	const agency43Sum = useMemo(() => {
		if (!metricsByAgencyDayData) return;
		const agency43Data = metricsByAgencyDayData.find(agencyBlock => agencyBlock.agency_id === '43');
		return agency43Data?.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0);
	}, [metricsByAgencyDayData]);

	const agency43Chart = useMemo(() => {
		if (!metricsByAgencyDayData) return;
		const foundData = metricsByAgencyDayData.find(agencyBlock => agencyBlock.agency_id === '43');
		return foundData?.data.map(dateBlock => ({ hour_group: DateTime.fromISO(dateBlock.hour_group).toFormat('yyyy-LL-dd HH:mm'), qty: dateBlock.qty }));
	}, [metricsByAgencyDayData]);

	//

	const agency44Sum = useMemo(() => {
		if (!metricsByAgencyDayData) return;
		const agency44Data = metricsByAgencyDayData.find(agencyBlock => agencyBlock.agency_id === '44');
		return agency44Data?.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0);
	}, [metricsByAgencyDayData]);

	const agency44Chart = useMemo(() => {
		if (!metricsByAgencyDayData) return;
		const foundData = metricsByAgencyDayData.find(agencyBlock => agencyBlock.agency_id === '44');
		return foundData?.data.map(dateBlock => ({ hour_group: DateTime.fromISO(dateBlock.hour_group).toFormat('yyyy-LL-dd HH:mm'), qty: dateBlock.qty }));
	}, [metricsByAgencyDayData]);

	//
	// C. Render components

	if (metricsByAgencyDayLoading || !allAgenciesSum) {
		return null;
	}

	return (
		<>

			<h3>{t('sections.aml.heading')}</h3>
			<MetricsDemandChart
				data={allAgenciesChart}
				data_key="hour_group"
				main_label={t('sections.aml.main_label')}
				main_value={t('sections.aml.main_value', { value: allAgenciesSum })}
				data_series={[
					{
						color: 'var(--color-brand)',
						label: 'Nº de validações',
						name: 'qty',
					},
					{
						color: 'var(--color-brand)',
						label: 'Nº de validações',
						name: 'zero',
					},
				]}
			/>

			<h3>{t('sections.by_agency.heading')}</h3>
			<Grid columns="ab" withGap>
				<MetricsDemandChart
					data={agency41Chart}
					data_key="hour_group"
					main_description={t('sections.by_agency.41.main_description')}
					main_label={t('sections.by_agency.41.main_label')}
					main_value={t('sections.by_agency.41.main_value', { value: agency41Sum || -1 })}
					data_series={[
						{
							color: 'var(--color-brand)',
							label: 'Nº de validações',
							name: 'qty',
						},
					]}
				/>
				<MetricsDemandChart
					data={agency42Chart}
					data_key="hour_group"
					main_description={t('sections.by_agency.42.main_description')}
					main_label={t('sections.by_agency.42.main_label')}
					main_value={t('sections.by_agency.42.main_value', { value: agency42Sum || -1 })}
					data_series={[
						{
							color: 'var(--color-brand)',
							label: 'Nº de validações',
							name: 'qty',
						},
					]}
				/>
				<MetricsDemandChart
					data={agency43Chart}
					data_key="hour_group"
					main_description={t('sections.by_agency.43.main_description')}
					main_label={t('sections.by_agency.43.main_label')}
					main_value={t('sections.by_agency.43.main_value', { value: agency43Sum || -1 })}
					data_series={[
						{
							color: 'var(--color-brand)',
							label: 'Nº de validações',
							name: 'qty',
						},
					]}
				/>
				<MetricsDemandChart
					data={agency44Chart}
					data_key="hour_group"
					main_description={t('sections.by_agency.44.main_description')}
					main_label={t('sections.by_agency.44.main_label')}
					main_value={t('sections.by_agency.44.main_value', { value: agency44Sum || -1 })}
					data_series={[
						{
							color: 'var(--color-brand)',
							label: 'Nº de validações',
							name: 'qty',
						},
					]}
				/>
			</Grid>

		</>
	);

	//
}
