'use client';
/* * */

import FrontendAlertsItem from '@/components/FrontendAlertsItem/FrontendAlertsItem';
import { Accordion } from '@mantine/core';
import styles from './FrontendAlertsSummary.module.css';
import FrontendAlertsSearch from '@/components/FrontendAlertsSearch/FrontendAlertsSearch';
import FrontendAlertsSelectMunicipality from '@/components/FrontendAlertsSelectMunicipality/FrontendAlertsSelectMunicipality';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

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
		entities: {
			alerts: alerts,
			lines: !selectedMunicipality ? lines : lines.filter(line => line.municipalities.includes(selectedMunicipality.id)),
			line: lines.find(line => line.id === selectedLine),
			municipality: selectedMunicipality,
		},
		selectLine: setSelectedLine,
		clearSelectedLine: () => setSelectedLine(null),
		selectMunicipality: setSelectedMunicipality,
		clearSelectedMunicipality: () => setSelectedMunicipality(null),
	};
	let renderedAlerts = alerts.entity
		.filter(
			alert => (selectedLine == null || alert.alert.informedEntity
				.some(v => v.routeId?.startsWith(selectedLine))) &&
      (selectedMunicipality == null || alert.alert.headerText.translation[0].text.includes(selectedMunicipality.name)),
		);

	// Group alerts by date and sort them
	let sorted = Object.entries(renderedAlerts.reduce((acc, alert) => {
		let date = new Date(alert.alert.activePeriod[0].start * 1000);
		let key = date.toLocaleDateString('pt-PT');
		if (!acc[key]) acc[key] = { timestamp: alert.alert.activePeriod[0].start * 1000, items: [] };
		acc[key].items.push(alert);
		return acc;
	}, {}))
		.sort((a, b) => b[1].timestamp - a[1].timestamp);

	return (
		<div className={styles.container}>
			<div className={styles.search}>
				<FrontendAlertsSelectMunicipality ctx={ctx} allMunicipalitiesData={municipalities}/>
				<FrontendAlertsSearch ctx={ctx} allLinesData={lines}/>
			</div>
			<Accordion m={0}>
				{sorted.map(([date, alerts], index) => <div key={index} className={styles.alertsContainer}>
					<div className={styles.alertDate}>
						{date}
					</div>
					<div className={styles.alertsContent}>
						{alerts.items.map((alert, alertIndex) => <FrontendAlertsItem
							key={alertIndex}
							type={alert.alert.effect}
							header={alert.alert.headerText.translation[0].text}
							description={alert.alert.descriptionText.translation[0].text}
							url={`/alerts/${alert.id}`}
						/>)}
					</div>
				</div>)}
			</Accordion>
		</div>
	);
	//
}