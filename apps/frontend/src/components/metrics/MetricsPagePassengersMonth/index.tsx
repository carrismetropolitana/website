'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { MetricsDemandChart } from '@/components/metrics/MetricsDemandChart';
import { type DemandMetricsByAgency, type DemandMetricsByAgencyMonth } from '@carrismetropolitana/api-types/metrics';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export function MetricsPagePassengersMonth() {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPagePassengersMonth');

	//
	// B. Fetch Data

	const { data: metricsByAgencyMonthData, isLoading: metricsByAgencyMonthLoading } = useSWR<DemandMetricsByAgency[]>(`${getPublicVariable('api_url')}/metrics/demand/by_agency/month`);

	//
	// C. Transform data

	const allAgenciesSum = useMemo(() => {
		if (!metricsByAgencyMonthData) return;
		return metricsByAgencyMonthData.reduce((acc, agencyBlock) => acc + agencyBlock.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0), 0);
	}, [metricsByAgencyMonthData]);

	const allAgenciesChart = useMemo(() => {
		if (!metricsByAgencyMonthData) return;
		// Reduce the data to a single array of objects with the structure { x: string, y: number }
		const result = metricsByAgencyMonthData.reduce((acc, agencyBlock) => {
			agencyBlock.data.forEach((dateBlock) => {
				const formattedDateBlock = dateBlock.day_group;
				const existingData = acc.find(item => item.day_group === formattedDateBlock);
				if (existingData) {
					existingData.qty += dateBlock.qty;
				}
				else {
					acc.push({ day_group: formattedDateBlock, qty: dateBlock.qty });
				}
			});
			return acc;
		}, [] as DemandMetricsByAgencyMonth[]);
		const sortedResult = result.sort((a, b) => a.day_group.localeCompare(b.day_group));
		return sortedResult;
	}, [metricsByAgencyMonthData]);

	//

	const agency41Sum = useMemo(() => {
		if (!metricsByAgencyMonthData) return;
		const agency41Data = metricsByAgencyMonthData.find(agencyBlock => agencyBlock.agency_id === '41');
		return agency41Data?.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0);
	}, [metricsByAgencyMonthData]);

	const agency41Chart = useMemo(() => {
		if (!metricsByAgencyMonthData) return;
		const foundData = metricsByAgencyMonthData.find(agencyBlock => agencyBlock.agency_id === '41');
		return foundData?.data.map(dateBlock => ({ day_group: dateBlock.day_group, qty: dateBlock.qty }));
	}, [metricsByAgencyMonthData]);

	//

	const agency42Sum = useMemo(() => {
		if (!metricsByAgencyMonthData) return;
		const agency42Data = metricsByAgencyMonthData.find(agencyBlock => agencyBlock.agency_id === '42');
		return agency42Data?.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0);
	}, [metricsByAgencyMonthData]);

	const agency42Chart = useMemo(() => {
		if (!metricsByAgencyMonthData) return;
		const foundData = metricsByAgencyMonthData.find(agencyBlock => agencyBlock.agency_id === '42');
		return foundData?.data.map(dateBlock => ({ day_group: dateBlock.day_group, qty: dateBlock.qty }));
	}, [metricsByAgencyMonthData]);

	//

	const agency43Sum = useMemo(() => {
		if (!metricsByAgencyMonthData) return;
		const agency43Data = metricsByAgencyMonthData.find(agencyBlock => agencyBlock.agency_id === '43');
		return agency43Data?.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0);
	}, [metricsByAgencyMonthData]);

	const agency43Chart = useMemo(() => {
		if (!metricsByAgencyMonthData) return;
		const foundData = metricsByAgencyMonthData.find(agencyBlock => agencyBlock.agency_id === '43');
		return foundData?.data.map(dateBlock => ({ day_group: dateBlock.day_group, qty: dateBlock.qty }));
	}, [metricsByAgencyMonthData]);

	//

	const agency44Sum = useMemo(() => {
		if (!metricsByAgencyMonthData) return;
		const agency44Data = metricsByAgencyMonthData.find(agencyBlock => agencyBlock.agency_id === '44');
		return agency44Data?.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0);
	}, [metricsByAgencyMonthData]);

	const agency44Chart = useMemo(() => {
		if (!metricsByAgencyMonthData) return;
		const foundData = metricsByAgencyMonthData.find(agencyBlock => agencyBlock.agency_id === '44');
		return foundData?.data.map(dateBlock => ({ day_group: dateBlock.day_group, qty: dateBlock.qty }));
	}, [metricsByAgencyMonthData]);

	//
	// C. Render components

	if (metricsByAgencyMonthLoading || !allAgenciesSum) {
		return null;
	}

	return (
		<>

			<h3>{t('sections.aml.heading')}</h3>
			<MetricsDemandChart
				data={allAgenciesChart}
				data_key="day_group"
				main_label={t('sections.aml.main_label')}
				main_value={t('sections.aml.main_value', { value: allAgenciesSum })}
				data_series={[
					{
						color: 'var(--color-brand)',
						label: 'Nº de validações',
						name: 'qty',
					},
				]}
			/>

			<h3>{t('sections.by_agency.heading')}</h3>
			<Grid columns="ab" withGap>
				<MetricsDemandChart
					data={agency41Chart}
					data_key="day_group"
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
					data_key="day_group"
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
					data_key="day_group"
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
					data_key="day_group"
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
