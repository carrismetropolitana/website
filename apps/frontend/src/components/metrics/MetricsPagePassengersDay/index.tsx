'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { MetricsDemandChart } from '@/components/metrics/MetricsDemandChart';
import { useMetricsContext } from '@/contexts/Metrics.context';
import { useTranslations } from 'next-intl';

/* * */

export function MetricsPagePassengersDay() {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPagePassengersDay');
	const { data } = useMetricsContext();

	//
	// B. Render components

	return (
		<>

			<h3>{t('sections.aml.heading')}</h3>
			<MetricsDemandChart
				data={data.agenciesByDay.all.chart.length ? data.agenciesByDay.all.chart : undefined}
				data_key="formatted_day"
				main_label={t('sections.aml.main_label')}
				main_value={t('sections.aml.main_value', { value: data.agenciesByDay.all.sum })}
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
					{ data: data.agenciesByDay.agencies['41'], id: '41' },
					{ data: data.agenciesByDay.agencies['42'], id: '42' },
					{ data: data.agenciesByDay.agencies['43'], id: '43' },
					{ data: data.agenciesByDay.agencies['44'], id: '44' },
				].map(({ data, id }) => (
					<MetricsDemandChart
						key={id}
						data={data?.chart}
						data_key="formatted_day"
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

//
