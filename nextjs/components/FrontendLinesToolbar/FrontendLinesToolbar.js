/* * */

import styles from './FrontendLinesToolbar.module.css';
import FrontendLinesToolbarFilters from '@/components/FrontendLinesToolbarFilters/FrontendLinesToolbarFilters';
import FrontendLinesToolbarSelectLine from '@/components/FrontendLinesToolbarSelectLine/FrontendLinesToolbarSelectLine';
import FrontendLinesToolbarPeriods from '@/components/FrontendLinesToolbarPeriods/FrontendLinesToolbarPeriods';

/* * */

export default function FrontendLinesToolbar() {
  return (
    <div className={styles.container}>
      <FrontendLinesToolbarFilters />
      <FrontendLinesToolbarSelectLine />
      <FrontendLinesToolbarPeriods />
    </div>
  );
}
