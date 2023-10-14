'use client';

import useSWR from 'swr';
import { Select } from '@mantine/core';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import styles from './LinesExplorerToolbarSelectMunicipality.module.css';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';

/* * */

export default function LinesExplorerToolbarSelectMunicipality() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerToolbarSelectMunicipality');
  const linesExplorerContext = useLinesExplorerContext();

  //
  // B. Fetch data

  const { data: allMunicipalitiesData } = useSWR('https://api.carrismetropolitana.pt/municipalities');

  //
  // C. Transform data

  const allMunicipalitiesDataFormatted = useMemo(() => {
    if (!allMunicipalitiesData) return [];
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    allMunicipalitiesData.sort((a, b) => collator.compare(a.name, b.name));
    return allMunicipalitiesData.map((item) => {
      return { value: item.id, label: item.name };
    });
  }, [allMunicipalitiesData]);

  //
  // D. Handle actions

  const handleSelectMunicipality = (chosenSelectItemValue) => {
    if (chosenSelectItemValue) linesExplorerContext.selectMunicipality(chosenSelectItemValue);
    else linesExplorerContext.clearSelectedMunicipality();
  };

  //
  // E. Render components

  return (
    <div className={styles.container}>
      <Select aria-label={t('label')} placeholder={t('placeholder')} nothingFoundMessage={t('no_results')} onChange={handleSelectMunicipality} value={linesExplorerContext.entities.municipality?.id || null} data={allMunicipalitiesDataFormatted} radius="sm" size="md" w="100%" searchable clearable />
    </div>
  );
}
