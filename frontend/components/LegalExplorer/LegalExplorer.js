'use client';

import styles from './LegalExplorer.module.css';
import { Divider } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Pannel from '@/components/Pannel/Pannel';

export default function LegalExplorer() {
  //

  //
  // A. Setup variables

  const t = useTranslations('LegalExplorer');

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
