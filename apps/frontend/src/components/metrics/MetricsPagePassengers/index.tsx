'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LastUpdatedAt } from '@/components/metrics/LastUpdatedAt';
import { MetricsPagePassengersDay } from '@/components/metrics/MetricsPagePassengersDay';
import { MetricsPagePassengersMonth } from '@/components/metrics/MetricsPagePassengersMonth';
import { useLocaleContext } from '@/contexts/Locale.context';
import { useMetricsContext } from '@/contexts/Metrics.context';
import { SegmentedControl } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

const PERIOD_OPTIONS = ['by_day', 'by_month'];

/* * */

export function MetricsPagePassengers() {
	//

	//
	// A. Define variables

	const t = useTranslations('metrics.MetricsPagePassengers');
	const [selectedPeriod, setSelectedPeriod] = useState(PERIOD_OPTIONS[0]);
	const locale = useLocaleContext();

	const { actions, data, filters } = useMetricsContext();

	//
	// B. Transform data

	const periodOptionsLabels = PERIOD_OPTIONS.map(option => ({ label: t(`period_options.${option}`), value: option }));

	//
	// C. Render components

	return (
		<Surface>
			<div id="passengerMetrics">
				<Section heading={t('heading')} withPadding>
					<p className={styles.text}>{t('text_1')}</p>
				</Section>

				<Section withGap withPadding>
					<div className={styles.datesWrapper}>
						<DatePickerInput
							label={t('dates.start_date')}
							locale={locale.data.current_locale}
							maxDate={filters.endDate.js_date}
							minDate={new Date('2024-01-01')}
							onChange={actions.setStartDate}
							placeholder={t('dates.start_date')}
							value={filters.startDate.js_date}
						/>
						<DatePickerInput
							label={t('dates.end_date')}
							locale={locale.data.current_locale}
							maxDate={new Date()}
							minDate={filters.startDate.js_date}
							onChange={actions.setEndDate}
							placeholder={t('dates.end_date')}
							value={filters.endDate.js_date}
						/>
					</div>
				</Section>

				<Section withGap withPadding>
					<SegmentedControl data={periodOptionsLabels} onChange={setSelectedPeriod} value={selectedPeriod} w="100%" />

					<LastUpdatedAt lastUpdated={data[selectedPeriod === 'by_day' ? 'agenciesByDay' : 'agenciesByMonth'].lastUpdated} />

					{/* {selectedPeriod === 'by_hour' && <MetricsPagePassengersHour />} */}
					{selectedPeriod === 'by_day' && <MetricsPagePassengersDay />}
					{selectedPeriod === 'by_month' && <MetricsPagePassengersMonth />}
				</Section>

			</div>
		</Surface>
	);

	//
}
