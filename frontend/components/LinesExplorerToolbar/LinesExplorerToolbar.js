/* * */

import styles from './LinesExplorerToolbar.module.css';
import LinesExplorerToolbarSelectLine from '@/components/LinesExplorerToolbarSelectLine/LinesExplorerToolbarSelectLine';
import LinesExplorerToolbarSelectMunicipality from '@/components/LinesExplorerToolbarSelectMunicipality/LinesExplorerToolbarSelectMunicipality';
import LinesExplorerToolbarSelectLocality from '@/components/LinesExplorerToolbarSelectLocality/LinesExplorerToolbarSelectLocality';
import LinesExplorerToolbarPeriods from '@/components/LinesExplorerToolbarPeriods/LinesExplorerToolbarPeriods';

/* * */

export default function LinesExplorerToolbar() {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <LinesExplorerToolbarSelectMunicipality />
        <LinesExplorerToolbarSelectLocality />
        {/* <LinesExplorerToolbarSelectFacilities /> */}
      </div>
      <LinesExplorerToolbarSelectLine />
      <LinesExplorerToolbarPeriods />
    </div>
  );
}
