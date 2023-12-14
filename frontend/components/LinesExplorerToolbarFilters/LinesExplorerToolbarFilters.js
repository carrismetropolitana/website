'use client';

/* * */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Collapse } from '@mantine/core';
import { IconFilterDown, IconFilterUp } from '@tabler/icons-react';
import styles from './LinesExplorerToolbarFilters.module.css';
import LinesExplorerToolbarFiltersMunicipality from '@/components/LinesExplorerToolbarFiltersMunicipality/LinesExplorerToolbarFiltersMunicipality';
import LinesExplorerToolbarFiltersLocality from '@/components/LinesExplorerToolbarFiltersLocality/LinesExplorerToolbarFiltersLocality';

/* * */

export default function LinesExplorerToolbarFilters() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LinesExplorerToolbarFilters');

  const [isOpen, setIsOpen] = useState(false);

  //
  // B. Handle actions

  const handleToggleFilters = () => {
    setIsOpen((prev) => !prev);
  };

  //
  // C. Render components

  return (
    <>
      <div className={styles.onlyOnDesktop}>
        <div className={styles.filters}>
          <LinesExplorerToolbarFiltersMunicipality />
          <LinesExplorerToolbarFiltersLocality />
          {/* <LinesExplorerToolbarFiltersFacilities /> */}
        </div>
      </div>
      <div className={styles.onlyOnMobile}>
        <div className={styles.toggleFilters}>
          <Button onClick={handleToggleFilters} leftSection={isOpen ? <IconFilterUp size={18} /> : <IconFilterDown size={18} />} className={`${styles.toggleFiltersButton} ${isOpen && styles.isOpen}`} size="xs">
            {isOpen ? t('toggle_filters.open.label') : t('toggle_filters.closed.label')}
          </Button>
        </div>
        <Collapse in={isOpen}>
          <div className={styles.filters}>
            <LinesExplorerToolbarFiltersMunicipality />
            <LinesExplorerToolbarFiltersLocality />
            {/* <LinesExplorerToolbarFiltersFacilities /> */}
          </div>
        </Collapse>
      </div>
    </>
  );

  //
}
