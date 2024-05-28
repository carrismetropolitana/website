'use client';

/* * */

import { useFrontendLinesContext } from '@/contexts/FrontendLinesContext'
import { Select } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import useSWR from 'swr'

import styles from './FrontendLinesToolbarFiltersLocality.module.css'

/* * */

export default function FrontendLinesToolbarFiltersLocality() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendLinesToolbarFiltersLocality');
  const FrontendLinesContext = useFrontendLinesContext();

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
      if (FrontendLinesContext.entities.municipality) if (FrontendLinesContext.entities.municipality?.id !== item.municipality_id) return;
      if (!groups[item.municipality_id]) {
        groups[item.municipality_id] = {
          localities: [],
          municipality_id: item.municipality_id,
          municipality_name: item.municipality_name,
        }
      }
      else {
        groups[item.municipality_id].localities.push({ label: item.display, value: item.id });
      }
    });
    const result = Object.values(groups).map(group => ({
      group: group.municipality_name,
      items: group.localities,
    }));
    result.sort((a, b) => collator.compare(a.group, b.group));
    return result;
  }, [allLocalitiesData, FrontendLinesContext.entities.municipality]);

  //
  // D. Handle actions

  const handleSelectLocality = (chosenSelectItemValue) => {
    if (chosenSelectItemValue) {
      const foundLocality = allLocalitiesData.find(item => item.id === chosenSelectItemValue);
      if (foundLocality) FrontendLinesContext.selectLocality(foundLocality);
    }
 else {
      FrontendLinesContext.clearSelectedLocality();
    }
  }

  //
  // E. Render components

  return (
    <div className={styles.container}>
      <Select aria-label={t('label')} clearable data={allLocalitiesDataFormatted} nothingFoundMessage={t('no_results')} onChange={handleSelectLocality} placeholder={t('placeholder')} radius="sm" searchable size="md" value={FrontendLinesContext.entities.locality?.id || null} w="100%" />
    </div>
  )

  //
}
