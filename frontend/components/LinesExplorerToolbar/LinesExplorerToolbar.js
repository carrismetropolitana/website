'use client';

/* * */

import styles from './LinesExplorerToolbar.module.css';
import LinesExplorerToolbarSelectMunicipality from '@/components/LinesExplorerToolbarSelectMunicipality/LinesExplorerToolbarSelectMunicipality';
import LinesExplorerToolbarSelectLine from '@/components/LinesExplorerToolbarSelectLine/LinesExplorerToolbarSelectLine';

/* * */

export default function LinesExplorerToolbar() {
  //

  //
  // A. Render components

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <LinesExplorerToolbarSelectMunicipality />
        <LinesExplorerToolbarSelectMunicipality />
        <LinesExplorerToolbarSelectMunicipality />
      </div>
      <LinesExplorerToolbarSelectLine />
    </div>
  );

  //
}
