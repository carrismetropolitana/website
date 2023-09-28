'use client';

import useSWR from 'swr';
import Link from 'next/link';
import styles from './AppVersion.module.css';
import pjson from '../../package.json';
import { useEffect } from 'react';

export default function AppVersion() {
  //

  //
  // A. Setup variables

  const { data: version } = useSWR('/version', { refreshInterval: 5000 });

  //
  // B. Handle actions

  useEffect(() => {
    if (version && version.latest !== pjson.version) {
      window.location.reload();
    }
  }, [version]);

  //
  // C. Render components

  return (
    <Link className={`${styles.link} ${styles.version}`} href="https://www.github.com/carrismetropolitana/website" target="_blank">
      {pjson.version}
    </Link>
  );
}
