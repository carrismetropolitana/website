'use client';

/* * */

import FrontendLinesToolbarFiltersLocality from '@/components/FrontendLinesToolbarFiltersLocality/FrontendLinesToolbarFiltersLocality'
import FrontendLinesToolbarFiltersMunicipality from '@/components/FrontendLinesToolbarFiltersMunicipality/FrontendLinesToolbarFiltersMunicipality'
import { Button, Collapse } from '@mantine/core'
import { IconFilterDown, IconFilterUp } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import styles from './FrontendLinesToolbarFilters.module.css'

/* * */

export default function FrontendLinesToolbarFilters() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendLinesToolbarFilters');

  const [isOpen, setIsOpen] = useState(false);

  //
  // B. Handle actions

  const handleToggleFilters = () => {
    setIsOpen(prev => !prev);
  };

  //
  // C. Render components

  return (
    <>
      <div className={styles.onlyOnDesktop}>
        <div className={styles.filters}>
          <FrontendLinesToolbarFiltersMunicipality />
          <FrontendLinesToolbarFiltersLocality />
          {/* <FrontendLinesToolbarFiltersFacilities /> */}
        </div>
      </div>
      <div className={styles.onlyOnMobile}>
        <div className={styles.toggleFilters}>
          <Button className={`${styles.toggleFiltersButton} ${isOpen && styles.isOpen}`} leftSection={isOpen ? <IconFilterUp size={18} /> : <IconFilterDown size={18} />} onClick={handleToggleFilters} size="xs">
            {isOpen ? t('toggle_filters.open.label') : t('toggle_filters.closed.label')}
          </Button>
        </div>
        <Collapse in={isOpen}>
          <div className={styles.filters}>
            <FrontendLinesToolbarFiltersMunicipality />
            <FrontendLinesToolbarFiltersLocality />
            {/* <FrontendLinesToolbarFiltersFacilities /> */}
          </div>
        </Collapse>
      </div>
    </>
  )

  //
}
