'use client';

import styles from './LegalExplorerCookies.module.css';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Pannel from '@/components/Pannel/Pannel';

export default function LegalExplorerCookies() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LegalExplorerCookies');

  //
  // E. Render components

  return (
    <Pannel type="B" title={t('title')}>
      <div>isjdsidujsid</div>
      <Divider />
      <div>isjdsidujsid</div>
    </Pannel>
  );

  //
}
