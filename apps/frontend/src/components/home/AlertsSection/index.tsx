'use client';

/* * */

import { AlertsCarousel } from '@/components/common/AlertsCarousel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { useAlertsContext } from '@/contexts/Alerts.context';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

/* * */

export function AlertsSection() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.AlertsSection');
	const alertsContext = useAlertsContext();

	//
	// B. Transform data

	const alertsActiveTodayAndTomorrow = useMemo(() => {
		// Sort alerts by start date descending
		const sortedAlerts = alertsContext.data.simplified.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
		// Filter alerts to only include alerts that start today or tomorrow
		const filteredAlerts = sortedAlerts.filter((alert) => {
			const today = DateTime.now().startOf('day').toJSDate();
			const alertDate = new Date(alert.start_date);
			return alertDate >= today;
		});

		// If there are alerts for today and tomorrow, return them; otherwise return the 5 most recent alertsr
		return (filteredAlerts.length > 0 ? filteredAlerts : sortedAlerts).slice(0, 5);
	}, [alertsContext.data.simplified]);

	//
	// C. Render components

	return (
		<Surface>
			<Section heading={t('section_heading')} href="/alerts" withGap>
				<AlertsCarousel alerts={alertsActiveTodayAndTomorrow} />
			</Section>
		</Surface>
	);

	//
}
