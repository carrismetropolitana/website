'use client';

import styles from './EncmExplorerGrid.module.css';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import EncmExplorerItem from '@/components/EncmExplorerItem/EncmExplorerItem';

export default function EncmExplorerGrid({ allEncmData, selectedEncmCode, onSelectEncmCode }) {
  //

  //
  // A. Transform data

  const allEncmGroupedByMunicipality = useMemo(() => {
    if (!allEncmData) return [];
    const groupedEncm = allEncmData.reduce((result, item) => {
      const existingGroup = result.find((group) => group.code === item.municipality_code);
      if (existingGroup) {
        existingGroup.encm.push(item);
      } else {
        result.push({
          code: item.municipality_code,
          name: item.municipality_name,
          encm: [item],
        });
      }
      return result;
    }, []);
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    const sortedGroups = groupedEncm.sort((a, b) => collator.compare(a.name, b.name));
    return sortedGroups;
  }, [allEncmData]);

  //
  // B. Render components

  return (
    <div className={styles.container}>
      {allEncmGroupedByMunicipality &&
        allEncmGroupedByMunicipality.map((group) => (
          <div key={group.code} className={styles.groupWrapper}>
            <div className={styles.groupTitle}>
              <p>{group.name}</p>
            </div>
            <div key={group.code} className={styles.grid}>
              {group.encm && group.encm.map((encm) => <EncmExplorerItem key={encm.code} encmData={encm} selectedEncmCode={selectedEncmCode} onSelectEncmCode={onSelectEncmCode} />)}
            </div>
          </div>
        ))}
    </div>
  );

  //
}
