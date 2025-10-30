'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { MetricsDemandChart } from '@/components/metrics/MetricsDemandChart';
import { useMetricsContext } from '@/contexts/Metrics.context';
import { useTranslations } from 'next-intl';

/* * */

export function MetricsPagePassengersMonth() {
	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPagePassengersMonth');
	const { data } = useMetricsContext();

	//
	// B. Render components

	return (
		<>

			<h3>{t('sections.aml.heading')}</h3>
			<MetricsDemandChart
				data={data.agenciesByMonth.all.chart.length ? data.agenciesByMonth.all.chart : undefined}
				data_key="formatted_month"
				display_type="bars"
				main_label={t('sections.aml.main_label')}
				main_value={t('sections.aml.main_value', { value: data.agenciesByMonth.all.sum })}
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
				{[
					{ data: data.agenciesByMonth.agencies['41'], id: '41' },
					{ data: data.agenciesByMonth.agencies['42'], id: '42' },
					{ data: data.agenciesByMonth.agencies['43'], id: '43' },
					{ data: data.agenciesByMonth.agencies['44'], id: '44' },
				].map(({ data, id }) => (
					<MetricsDemandChart
						key={id}
						data={data?.chart}
						data_key="formatted_month"
						display_type="bars"
						main_description={t(`sections.by_agency.${id}.main_description`)}
						main_label={t(`sections.by_agency.${id}.main_label`)}
						data_series={[
							{
								color: 'var(--color-brand)',
								label: 'Nº de validações',
								name: 'qty',
							},
						]}
						main_value={t(`sections.by_agency.${id}.main_value`, {
							value: data?.sum || -1,
						})}
					/>
				))}
			</Grid>
		</>
	);
}
