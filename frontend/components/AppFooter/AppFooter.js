'use client';

import styles from './AppFooter.module.css';
import AppFooterLogo from '@/components/AppFooterLogo/AppFooterLogo';
import AppFooterLegal from '@/components/AppFooterLegal/AppFooterLegal';
import AppFooterNav from '@/components/AppFooterNav/AppFooterNav';
import { useDebugContext } from '@/contexts/DebugContext';

/* * */

export default function AppFooter() {
  //

  //
  // A. Setup variables

  const debugContext = useDebugContext();

  //
  // B. Render Components

  return (
    <footer className={`${styles.container} ${debugContext.isDebug && styles.debugEnabled}`}>
      <div className={styles.grid}>
        <AppFooterLogo />
        <AppFooterNav />
      </div>
      <AppFooterLegal />
    </footer>
  );
}
