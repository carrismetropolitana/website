'use client';

import styles from './AppFooter.module.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import AppFooterLogo from '../AppFooterLogo/AppFooterLogo';
import AppFooterLegal from '../AppFooterLegal/AppFooterLegal';
import AppFooterNav from '../AppFooterNav/AppFooterNav';

export default function AppFooter() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AppFooter');

  // F. Render Components

  return (
    <footer className={styles.container}>
      {/* <AppFooterLogo /> */}
      {/* <AppFooterNav /> */}
      <AppFooterLegal />
    </footer>
  );
}
