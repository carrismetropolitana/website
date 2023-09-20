'use client';

import { useContext } from 'react';
import styles from './AppFooter.module.css';
import AppFooterLogo from '@/components/AppFooterLogo/AppFooterLogo';
import AppFooterLegal from '@/components/AppFooterLegal/AppFooterLegal';
import AppFooterNav from '@/components/AppFooterNav/AppFooterNav';
import { DebugContext } from '@/contexts/DebugContext';

export default function AppFooter() {
  //

  //
  // A. Setup variables

  const debugContext = useContext(DebugContext);

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
