"use client"
/* * */

import FrontendAlertsItem from '@/components/FrontendAlertsItem/FrontendAlertsItem';
import { Accordion } from '@mantine/core';
import styles from "./FrontendAlertsSummary.module.css";
import FrontendAlertsSearch from '@/components/FrontendAlertsSearch/FrontendAlertsSearch';
import FrontendAlertsSelectMunicipality from '@/components/FrontendAlertsSelectMunicipality/FrontendAlertsSelectMunicipality';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

/* * */

export default function FrontendAlerts({ alerts,lines,municipalities }) {
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
      lines: !selectedMunicipality?lines:lines.filter((line) => line.municipalities.includes(selectedMunicipality.id)),
      line: lines.find((line) => line.id === selectedLine),
      municipality: selectedMunicipality
    },
    selectLine: setSelectedLine,
    clearSelectedLine: () => setSelectedLine(null),
    selectMunicipality: setSelectedMunicipality,
    clearSelectedMunicipality: () => setSelectedMunicipality(null)
  }
  let renderedAlerts = alerts.entity
  .filter(
    (alert) => (selectedLine == null || alert.alert.informedEntity
      .some((v)=>
        v.routeId?.startsWith(selectedLine)
      ))
      && ( selectedMunicipality == null || alert.alert.headerText.translation[0].text.includes(selectedMunicipality.name))
    )

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <FrontendAlertsSelectMunicipality ctx={ctx} allMunicipalitiesData={municipalities}/>
        <FrontendAlertsSearch ctx={ctx} allLinesData={lines}/>
      </div>
      <Accordion m={8}>
        {renderedAlerts.length>0?renderedAlerts.map((alert, i) => (
          <FrontendAlertsItem key={i}
          type={alert.alert.effect}
          header={alert.alert.headerText.translation[0].text}
          description={alert.alert.descriptionText.translation[0].text}
          url={alert.alert.url.translation[0].text}
          />
        )):t('no_results')}
      </Accordion>
    </div>
  );
  //
}
