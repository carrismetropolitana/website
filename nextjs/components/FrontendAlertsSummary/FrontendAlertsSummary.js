'use client';
/* * */

import FrontendAlertsItem from '@/components/FrontendAlertsItem/FrontendAlertsItem';
import FrontendAlertsSearch from '@/components/FrontendAlertsSearch/FrontendAlertsSearch';
import FrontendAlertsSelectMunicipality from '@/components/FrontendAlertsSelectMunicipality/FrontendAlertsSelectMunicipality';
import { Accordion } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './FrontendAlertsSummary.module.css';

/* * */

export default function FrontendAlerts({ alerts, lines, municipalities }) {
	//

	//
	// A. Setup variables
	let [selectedLine, setSelectedLine] = useState(null);
	let [selectedMunicipality, setSelectedMunicipality] = useState(null);
	let t = useTranslations('FrontendAlertsSummary');

	// B. Fetch data

	//
	// C. Render components

	let ctx = {
		clearSelectedLine: () => setSelectedLine(null),
		clearSelectedMunicipality: () => setSelectedMunicipality(null),
		entities: {
			alerts: alerts,
			line: lines.find(line => line.id === selectedLine),
			lines: !selectedMunicipality ? lines : lines.filter(line => line.municipalities.includes(selectedMunicipality.id)),
			municipality: selectedMunicipality,
		},
		selectLine: setSelectedLine,
		selectMunicipality: setSelectedMunicipality,
	};
	let renderedAlerts = alerts.entity
		.filter(
			alert => (selectedLine == null || alert.alert.informedEntity
				.some(v => v.routeId?.startsWith(selectedLine)))
				&& (selectedMunicipality == null || alert.alert.headerText.translation[0].text.includes(selectedMunicipality.name)),
		);

	// Group alerts by date and sort them
	let sorted = Object.entries(renderedAlerts.reduce((acc, alert) => {
		let date = new Date(alert.alert.activePeriod[0].start * 1000);
		let key = date.toLocaleDateString('pt-PT');
		if (!acc[key]) acc[key] = { items: [], timestamp: alert.alert.activePeriod[0].start * 1000 };
		acc[key].items.push(alert);
		return acc;
	}, {}))
		.sort((a, b) => b[1].timestamp - a[1].timestamp);

	return (
		<div className={styles.container}>
			<div className={styles.search}>
				<FrontendAlertsSelectMunicipality allMunicipalitiesData={municipalities} ctx={ctx} />
				<FrontendAlertsSearch allLinesData={lines} ctx={ctx} />
			</div>
			<Accordion m={0}>
				{sorted.map(([date, alerts], index) => (
					<div key={index} className={styles.alertsContainer}>
						<div className={styles.alertDate}>
							{date}
						</div>
						<div className={styles.alertsContent}>
							{alerts.items.map((alert, alertIndex) => (
								<FrontendAlertsItem
									key={alertIndex}
									description={alert.alert.descriptionText.translation[0].text}
									header={alert.alert.headerText.translation[0].text}
									type={alert.alert.effect}
									url={`/alerts/${alert.id}`}
								/>
							))}
						</div>
					</div>
				),

				)}
			</Accordion>
		</div>
	);
	//
}
