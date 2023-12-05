'use client';

import styles from './LinesExplorerToolbar.module.css';
import LinesExplorerToolbarSelectMunicipality from '@/components/LinesExplorerToolbarSelectMunicipality/LinesExplorerToolbarSelectMunicipality';
import LinesExplorerToolbarSelectLine from '@/components/LinesExplorerToolbarSelectLine/LinesExplorerToolbarSelectLine';
import LinesExplorerToolbarSelectDate from '../LinesExplorerToolbarSelectDate/LinesExplorerToolbarSelectDate';

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
      <div className={styles.main}>
        <LinesExplorerToolbarSelectLine />
        {/* <LinesExplorerToolbarSelectDate /> */}
      </div>
    </div>
  );
}
