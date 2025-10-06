'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { MetricsDemandChart } from '@/components/metrics/MetricsDemandChart';
import { type DemandMetricsByAgency, type DemandMetricsByAgencyYear } from '@carrismetropolitana/api-types/metrics';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export function MetricsPagePassengersYear() {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPagePassengersYear');

	//
	// B. Fetch Data

	const { data: metricsByAgencyYearData, isLoading: metricsByAgencyYearLoading } = useSWR<DemandMetricsByAgency[]>(`${getPublicVariable('api_url')}/metrics/demand/by_agency/year`);

	//
	// C. Transform data

	const allAgenciesSum = useMemo(() => {
		if (!metricsByAgencyYearData) return;
		return metricsByAgencyYearData.reduce((acc, agencyBlock) => acc + agencyBlock.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0), 0);
	}, [metricsByAgencyYearData]);

	const allAgenciesChart = useMemo(() => {
		if (!metricsByAgencyYearData) return;
		// Reduce the data to a single array of objects with the structure { x: string, y: number }
		const result = metricsByAgencyYearData.reduce((acc, agencyBlock) => {
			agencyBlock.data.forEach((dateBlock) => {
				const formattedDateBlock = DateTime.fromFormat(dateBlock.month_group, 'yyyy-LL').toFormat('\'(\'LL\')\' LLL yyyy');
				const existingData = acc.find(item => item.month_group === formattedDateBlock);
				if (existingData) {
					existingData.qty += dateBlock.qty;
				}
				else {
					acc.push({ month_group: formattedDateBlock, qty: dateBlock.qty });
				}
			});
			return acc;
		}, [] as DemandMetricsByAgencyYear[]);
		const sortedResult = result.sort((a, b) => a.month_group.localeCompare(b.month_group));
		return sortedResult;
	}, [metricsByAgencyYearData]);

	//

	const agency41Sum = useMemo(() => {
		if (!metricsByAgencyYearData) return;
		const agency41Data = metricsByAgencyYearData.find(agencyBlock => agencyBlock.agency_id === '41');
		return agency41Data?.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0);
	}, [metricsByAgencyYearData]);

	const agency41Chart = useMemo(() => {
		if (!metricsByAgencyYearData) return;
		const foundData = metricsByAgencyYearData.find(agencyBlock => agencyBlock.agency_id === '41');
		return foundData?.data.map(dateBlock => ({ month_group: DateTime.fromFormat(dateBlock.month_group, 'yyyy-LL').toFormat('\'(\'LL\')\' LLL yyyy'), qty: dateBlock.qty }));
	}, [metricsByAgencyYearData]);

	//

	const agency42Sum = useMemo(() => {
		if (!metricsByAgencyYearData) return;
		const agency42Data = metricsByAgencyYearData.find(agencyBlock => agencyBlock.agency_id === '42');
		return agency42Data?.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0);
	}, [metricsByAgencyYearData]);

	const agency42Chart = useMemo(() => {
		if (!metricsByAgencyYearData) return;
		const foundData = metricsByAgencyYearData.find(agencyBlock => agencyBlock.agency_id === '42');
		return foundData?.data.map(dateBlock => ({ month_group: DateTime.fromFormat(dateBlock.month_group, 'yyyy-LL').toFormat('\'(\'LL\')\' LLL yyyy'), qty: dateBlock.qty }));
	}, [metricsByAgencyYearData]);

	//

	const agency43Sum = useMemo(() => {
		if (!metricsByAgencyYearData) return;
		const agency43Data = metricsByAgencyYearData.find(agencyBlock => agencyBlock.agency_id === '43');
		return agency43Data?.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0);
	}, [metricsByAgencyYearData]);

	const agency43Chart = useMemo(() => {
		if (!metricsByAgencyYearData) return;
		const foundData = metricsByAgencyYearData.find(agencyBlock => agencyBlock.agency_id === '43');
		return foundData?.data.map(dateBlock => ({ month_group: DateTime.fromFormat(dateBlock.month_group, 'yyyy-LL').toFormat('\'(\'LL\')\' LLL yyyy'), qty: dateBlock.qty }));
	}, [metricsByAgencyYearData]);

	//

	const agency44Sum = useMemo(() => {
		if (!metricsByAgencyYearData) return;
		const agency44Data = metricsByAgencyYearData.find(agencyBlock => agencyBlock.agency_id === '44');
		return agency44Data?.data.reduce((innerAcc, dateBlock) => innerAcc + dateBlock.qty, 0);
	}, [metricsByAgencyYearData]);

	const agency44Chart = useMemo(() => {
		if (!metricsByAgencyYearData) return;
		const foundData = metricsByAgencyYearData.find(agencyBlock => agencyBlock.agency_id === '44');
		return foundData?.data.map(dateBlock => ({ month_group: DateTime.fromFormat(dateBlock.month_group, 'yyyy-LL').toFormat('\'(\'LL\')\' LLL yyyy'), qty: dateBlock.qty }));
	}, [metricsByAgencyYearData]);

	//
	// C. Render components

	if (metricsByAgencyYearLoading || !allAgenciesSum) {
		return null;
	}

	return (
		<>

			<h3>{t('sections.aml.heading')}</h3>
			<MetricsDemandChart
				data={allAgenciesChart}
				data_key="month_group"
				display_type="bars"
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
					data_key="month_group"
					display_type="bars"
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
					data_key="month_group"
					display_type="bars"
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
					data_key="month_group"
					display_type="bars"
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
					data_key="month_group"
					display_type="bars"
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
