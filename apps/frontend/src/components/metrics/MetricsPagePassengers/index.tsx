'use client';

/* * */

import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { MetricsPagePassengersDay } from '@/components/metrics/MetricsPagePassengersDay';
import { MetricsPagePassengersMonth } from '@/components/metrics/MetricsPagePassengersMonth';
import { MetricsPagePassengersYear } from '@/components/metrics/MetricsPagePassengersYear';
import { SegmentedControl } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

const PERIOD_OPTIONS = ['day', 'month', 'year'];

/* * */

export function MetricsPagePassengers() {
	//

	//
	// A. Fetch Data

	const t = useTranslations('metrics.MetricsPagePassengers');
	const [selectedPeriod, setSelectedPeriod] = useState(PERIOD_OPTIONS[0]);

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
					<SegmentedControl data={periodOptionsLabels} onChange={setSelectedPeriod} value={selectedPeriod} w="100%" />
					{selectedPeriod === 'day' && <MetricsPagePassengersDay />}
					{selectedPeriod === 'month' && <MetricsPagePassengersMonth />}
					{selectedPeriod === 'year' && <MetricsPagePassengersYear />}
				</Section>
			</div>
		</Surface>
	);

	//
}
