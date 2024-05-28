'use client';

/* * */

import Link from 'next/link'
import pjson from 'package.json'
import { useEffect } from 'react'
import useSWR from 'swr'

import styles from './AppVersion.module.css'

/* * */

export default function AppVersion() {
  //

  //
  // A. Fetch data

  const { data: version } = useSWR('/api/version', { refreshInterval: 20000 });

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
  )

  //
}
