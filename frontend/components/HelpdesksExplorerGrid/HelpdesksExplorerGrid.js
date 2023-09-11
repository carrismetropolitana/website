'use client';

import styles from './HelpdesksExplorerGrid.module.css';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import HelpdesksExplorerItem from '@/components/HelpdesksExplorerItem/HelpdesksExplorerItem';

export default function HelpdesksExplorerGrid({ allHelpdesksData }) {
  //

  //
  // A. Setup variables

  const t = useTranslations('HelpdesksExplorerGrid');

  //
  // C. Transform data

  const allHelpdesksGroupedByMunicipality = useMemo(() => {
    if (!allHelpdesksData) return [];
    const groupedHelpdesks = allHelpdesksData.reduce((result, item) => {
      const existingGroup = result.find((group) => group.code === item.municipality_code);
      if (existingGroup) {
        existingGroup.helpdesks.push(item);
      } else {
        result.push({
          code: item.municipality_code,
          name: item.municipality_name,
          helpdesks: [item],
        });
      }
      return result;
    }, []);
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    const sortedGroups = groupedHelpdesks.sort((a, b) => collator.compare(a.name, b.name));
    return sortedGroups;
  }, [allHelpdesksData]);

  //
  // E. Render components

  return (
    <div className={styles.container}>
      {allHelpdesksGroupedByMunicipality &&
        allHelpdesksGroupedByMunicipality.map((group) => (
          <div key={group.code} className={styles.groupWrapper}>
            <div className={styles.groupTitle}>
              <p>{group.name}</p>
            </div>
            <div key={group.code} className={styles.helpdesksGrid}>
              {group.helpdesks && group.helpdesks.map((helpdesk) => <HelpdesksExplorerItem key={helpdesk.code} helpdeskData={helpdesk} />)}
            </div>
          </div>
        ))}
    </div>
  );

  //
}
