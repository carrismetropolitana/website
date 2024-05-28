// 'use client';

/* * */

// import FrontendAlertsSummary from '@/components/FrontendAlertsSummary/FrontendAlertsSummary';
import { Accordion } from '@mantine/core'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import styles from './FrontendAlertsItem.module.css'

/* * */

export default function FrontendAlertsItem({ description, header, type, url }) {
  //

  //
  // A. Setup variables
  let t = useTranslations('FrontendAlertsItem');

  //
  // C. Render components
  let iconName = 'OTHER_EFFECT';
  let possibleIcons = ['REDUCED_SERVICE'];
  if (possibleIcons.includes(type)) {
    iconName = type;
  }
  let icon = <img alt="icon" className={styles.icon} src={'/icons/alerts/' + iconName + '.svg'} />;
  return (
    <Accordion.Item className={styles.item} py={4} value={header}>
      <Accordion.Control icon={icon}>
        <h3>{header}</h3>
      </Accordion.Control>
      <Accordion.Panel>
        {description}
        {' '}
        <br />
        <Link href={url} prefetch={false} style={{ color: 'var(--info5)' }}>{t('show_more')}</Link>
      </Accordion.Panel>
    </Accordion.Item>
  )

  //
}
