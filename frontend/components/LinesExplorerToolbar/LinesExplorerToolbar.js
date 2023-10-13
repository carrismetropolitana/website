'use client';

import styles from './LinesExplorerToolbar.module.css';
import LinesExplorerToolbarLineSearch from '@/components/LinesExplorerToolbarLineSearch/LinesExplorerToolbarLineSearch';
import LinesExplorerToolbarMunicipalitySearch from '@/components/LinesExplorerToolbarMunicipalitySearch/LinesExplorerToolbarMunicipalitySearch';

/* * */

export default function LinesExplorerToolbar() {
  //

  //
  // A. Render components

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <LinesExplorerToolbarMunicipalitySearch />
        <LinesExplorerToolbarMunicipalitySearch />
        <LinesExplorerToolbarMunicipalitySearch />
      </div>
      <div className={styles.line}>
        <LinesExplorerToolbarLineSearch />
      </div>
    </div>
  );
}
