'use client';

/* * */

import useSWR from 'swr';
import { Select } from '@mantine/core';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import styles from './LinesExplorerToolbarSelectLocality.module.css';
import { useLinesExplorerContext } from '@/contexts/LinesExplorerContext';

/* * */

export default function LinesExplorerToolbarSelectLocality() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerToolbarSelectLocality');
  const linesExplorerContext = useLinesExplorerContext();

  //
  // B. Fetch data

  const { data: allLocalitiesData } = useSWR('https://api.carrismetropolitana.pt/localities');

  //
  // C. Transform data

  const allLocalitiesDataFormatted = useMemo(() => {
    if (!allLocalitiesData) return [];
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    allLocalitiesData.sort((a, b) => collator.compare(a.locality, b.locality));
    const groups = {};
    allLocalitiesData.forEach((item) => {
      if (linesExplorerContext.entities.municipality) if (linesExplorerContext.entities.municipality?.id !== item.municipality_id) return;
      if (!groups[item.municipality_id]) {
        groups[item.municipality_id] = {
          municipality_id: item.municipality_id,
          municipality_name: item.municipality_name,
          localities: [],
        };
      } else {
        groups[item.municipality_id].localities.push({ value: item.id, label: item.display });
      }
    });
    const result = Object.values(groups).map((group) => ({
      group: group.municipality_name,
      items: group.localities,
    }));
    result.sort((a, b) => collator.compare(a.group, b.group));
    return result;
  }, [allLocalitiesData, linesExplorerContext.entities.municipality]);

  //
  // D. Handle actions

  const handleSelectLocality = (chosenSelectItemValue) => {
    if (chosenSelectItemValue) {
      const foundLocality = allLocalitiesData.find((item) => item.id === chosenSelectItemValue);
      if (foundLocality) linesExplorerContext.selectLocality(foundLocality);
    } else {
      linesExplorerContext.clearSelectedLocality();
    }
  };

  //
  // E. Render components

  return (
    <div className={styles.container}>
      <Select aria-label={t('label')} placeholder={t('placeholder')} nothingFoundMessage={t('no_results')} onChange={handleSelectLocality} value={linesExplorerContext.entities.locality?.id || null} data={allLocalitiesDataFormatted} radius="sm" size="md" w="100%" searchable clearable />
    </div>
  );

  //
}
