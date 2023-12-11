'use client';

/* * */

import styles from './LinesExplorerToolbar.module.css';
import LinesExplorerToolbarSelectLine from '@/components/LinesExplorerToolbarSelectLine/LinesExplorerToolbarSelectLine';
import LinesExplorerToolbarSelectMunicipality from '@/components/LinesExplorerToolbarSelectMunicipality/LinesExplorerToolbarSelectMunicipality';
import LinesExplorerToolbarSelectLocality from '@/components/LinesExplorerToolbarSelectLocality/LinesExplorerToolbarSelectLocality';

/* * */

export default function LinesExplorerToolbar() {
  //

  //
  // A. Render components

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <LinesExplorerToolbarSelectMunicipality />
        <LinesExplorerToolbarSelectLocality />
        {/* <LinesExplorerToolbarSelectMunicipality /> */}
      </div>
      <LinesExplorerToolbarSelectLine />
    </div>
  );

  //
}
