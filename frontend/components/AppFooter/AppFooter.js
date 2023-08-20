'use client';

import styles from './AppFooter.module.css';
import AppFooterLogo from '../AppFooterLogo/AppFooterLogo';
import AppFooterLegal from '../AppFooterLegal/AppFooterLegal';
import AppFooterNav from '../AppFooterNav/AppFooterNav';

export default function AppFooter() {
  //

  //
  // A. Render Components

  return (
    <footer className={styles.container}>
      <div className={styles.grid}>
        <AppFooterLogo />
        {/* <AppFooterNav /> */}
      </div>
      <AppFooterLegal />
    </footer>
  );
}
