/* * */

import styles from './LinesExplorerToolbar.module.css';
import LinesExplorerToolbarFilters from '@/components/LinesExplorerToolbarFilters/LinesExplorerToolbarFilters';
import LinesExplorerToolbarSelectLine from '@/components/LinesExplorerToolbarSelectLine/LinesExplorerToolbarSelectLine';
import LinesExplorerToolbarPeriods from '@/components/LinesExplorerToolbarPeriods/LinesExplorerToolbarPeriods';

/* * */

export default function LinesExplorerToolbar() {
  return (
    <div className={styles.container}>
      <LinesExplorerToolbarFilters />
      <LinesExplorerToolbarSelectLine />
      <LinesExplorerToolbarPeriods />
    </div>
  );
}
